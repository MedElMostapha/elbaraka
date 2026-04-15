import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// 1. Batches (Gestion des lots)
export const batches = sqliteTable('batches', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  arrivalDate: integer('arrival_date', { mode: 'timestamp' }).notNull(),
  breed: text('breed').notNull(),
  initialQuantity: integer('initial_quantity').notNull(),
  costPerChick: real('cost_per_chick').notNull(),
  status: text('status', { enum: ['active', 'sold', 'archived'] }).default('active').notNull(),
});

// 2. Daily Logs (Suivi journalier)
export const dailyLogs = sqliteTable('daily_logs', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  batchId: text('batch_id').references(() => batches.id).notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  mortality: integer('mortality').default(0).notNull(),
  feedConsumedKg: real('feed_consumed_kg').default(0).notNull(),
  waterConsumedL: real('water_consumed_l').default(0).notNull(),
  medication: text('medication'),
  notes: text('notes'),
});

// 3. Inventory (Gestion des stocks)
export const inventory = sqliteTable('inventory', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  category: text('category', { enum: ['feed', 'medicine', 'packaging', 'other'] }).notNull(),
  quantity: real('quantity').notNull(), // Current stock level
  unit: text('unit').notNull(), // e.g., 'kg', 'bags', 'vials'
  minThreshold: real('min_threshold').default(10), // For low stock alerts
});

// 4. Clients (Registry for debts)
export const clients = sqliteTable('clients', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  phone: text('phone'),
  address: text('address'),
  totalBalance: real('total_balance').default(0).notNull(), // Aggregate debt
});

// 5. Sales (Gestion des ventes)
export const sales = sqliteTable('sales', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  batchId: text('batch_id').references(() => batches.id).notNull(),
  clientId: text('client_id').references(() => clients.id),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  quantity: real('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  totalPrice: real('total_price').notNull(),
  type: text('type', { enum: ['wholesale', 'retail'] }).notNull(),
  amountPaid: real('amount_paid').default(0).notNull(),
});

// 6. Debts (Detailed tracking)
export const debts = sqliteTable('debts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  clientId: text('client_id').references(() => clients.id).notNull(),
  saleId: text('sale_id').references(() => sales.id).notNull(),
  amountRemaining: real('amount_remaining').notNull(),
  status: text('status', { enum: ['unpaid', 'partial', 'paid'] }).default('unpaid').notNull(),
  dueDate: integer('due_date', { mode: 'timestamp' }),
});
