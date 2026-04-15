CREATE TABLE `batches` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`arrival_date` integer NOT NULL,
	`breed` text NOT NULL,
	`initial_quantity` integer NOT NULL,
	`cost_per_chick` real NOT NULL,
	`status` text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`address` text,
	`total_balance` real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `daily_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`date` integer NOT NULL,
	`mortality` integer DEFAULT 0 NOT NULL,
	`feed_consumed_kg` real DEFAULT 0 NOT NULL,
	`water_consumed_l` real DEFAULT 0 NOT NULL,
	`medication` text,
	`notes` text,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `debts` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` text NOT NULL,
	`sale_id` text NOT NULL,
	`amount_remaining` real NOT NULL,
	`status` text DEFAULT 'unpaid' NOT NULL,
	`due_date` integer,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`quantity` real NOT NULL,
	`unit` text NOT NULL,
	`min_threshold` real DEFAULT 10
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`client_id` text,
	`date` integer NOT NULL,
	`quantity` real NOT NULL,
	`unit_price` real NOT NULL,
	`total_price` real NOT NULL,
	`type` text NOT NULL,
	`amount_paid` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE no action
);
