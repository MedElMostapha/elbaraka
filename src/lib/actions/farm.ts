'use server';

import { db } from '@/db';
import { dailyLogs, inventory, batches, sales, clients, debts } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// 1. Daily Tracking with Auto-Inventory Decrement
export async function saveDailyLog(data: {
  batchId: string;
  mortality: number;
  feedConsumedKg: number;
  waterConsumedL: number;
  medication?: string;
  notes?: string;
  date: Date;
}) {
  try {
    await db.transaction(async (tx) => {
      // Create log
      await tx.insert(dailyLogs).values({
        batchId: data.batchId,
        date: data.date,
        mortality: data.mortality,
        feedConsumedKg: data.feedConsumedKg,
        waterConsumedL: data.waterConsumedL,
        medication: data.medication,
        notes: data.notes,
      });

      // Find and decrement feed stock (assuming 'Feed' exists in inventory)
      // In a real app, you'd match by name or specific category
      await tx
        .update(inventory)
        .set({
          quantity: sql`${inventory.quantity} - ${data.feedConsumedKg}`,
        })
        .where(eq(inventory.category, 'feed'));
    });

    revalidatePath('/[locale]/tracking', 'page');
    revalidatePath('/[locale]/inventory', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to save log:', error);
    return { success: false, error: 'Database error' };
  }
}

// 2. Batch Creation
export async function createBatch(data: {
  name: string;
  arrivalDate: Date;
  breed: string;
  initialQuantity: number;
  costPerChick: number;
}) {
  try {
    await db.insert(batches).values(data);
    revalidatePath('/[locale]/batches', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to create batch:', error);
    return { success: false };
  }
}

// 3. Sales with Debt Generation
export async function recordSale(data: {
  batchId: string;
  clientId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: 'wholesale' | 'retail';
  amountPaid: number;
  date: Date;
}) {
  try {
    await db.transaction(async (tx) => {
      const saleResult = await tx.insert(sales).values(data).returning();
      const saleId = saleResult[0].id;

      const remaining = data.totalPrice - data.amountPaid;

      if (remaining > 0 && data.clientId) {
        // Record debt
        await tx.insert(debts).values({
          clientId: data.clientId,
          saleId: saleId,
          amountRemaining: remaining,
          status: 'partial',
        });

        // Update client balance
        await tx
          .update(clients)
          .set({
            totalBalance: sql`${clients.totalBalance} + ${remaining}`,
          })
          .where(eq(clients.id, data.clientId));
      }
    });

    revalidatePath('/[locale]/sales', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to record sale:', error);
    return { success: false };
  }
}

// 4. Stock Management
export async function updateStock(id: string, newQuantity: number) {
  try {
    await db.update(inventory).set({ quantity: newQuantity }).where(eq(inventory.id, id));
    revalidatePath('/[locale]/inventory', 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to update stock:', error);
    return { success: false };
  }
}
