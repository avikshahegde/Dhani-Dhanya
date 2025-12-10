# MySQL Database Setup Guide

## Prerequisites
- MySQL Server installed and running
- MySQL credentials (username and password)

## Step 1: Configure Database Connection

Edit the `.env.local` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=dhani_dhanya
```

## Step 2: Create Database and Tables

### Option A: Using MySQL Command Line

1. Open MySQL:
```bash
mysql -u root -p
```

2. Create the database:
```sql
CREATE DATABASE dhani_dhanya;
USE dhani_dhanya;
```

3. Run the setup script:
```sql
source C:/path/to/your/project/mini/scripts/setup-database.sql
```

### Option B: Copy-Paste SQL Commands

1. Open MySQL and create database:
```sql
CREATE DATABASE dhani_dhanya;
USE dhani_dhanya;
```

2. Copy and paste all SQL commands from `scripts/setup-database.sql`

3. Verify tables were created:
```sql
SHOW TABLES;
```

You should see:
- products
- transactions
- transaction_items

## Step 3: Start the Application

```bash
npm run dev
```

## Step 4: Verify Database Connection

Visit: `http://localhost:3000/db-status`

This page shows:
- Database connection status
- Number of products in database
- Number of transactions in database

## How It Works

### Automatic Data Sync

1. **Upload Dataset**: When you upload a CSV file, products are automatically saved to MySQL
2. **POS Transactions**: Every purchase in the POS system is saved to the database
3. **Stock Updates**: Product stock levels are automatically updated after each sale

### Database Tables

**products**
- Stores all product information
- Updated when dataset is uploaded
- Stock levels updated after each sale

**transactions**
- Stores transaction summary (total, tax, date)
- Created when payment is processed

**transaction_items**
- Stores individual items in each transaction
- Links to products and transactions tables

## Viewing Data in MySQL

```sql
-- View all products
SELECT * FROM products;

-- View products expiring soon
SELECT * FROM products WHERE days_to_expiry <= 3 ORDER BY days_to_expiry;

-- View all transactions
SELECT * FROM transactions ORDER BY transaction_date DESC;

-- View transaction details with items
SELECT t.*, ti.product_name, ti.quantity, ti.unit_price
FROM transactions t
JOIN transaction_items ti ON t.id = ti.transaction_id
ORDER BY t.transaction_date DESC;

-- View total sales by product
SELECT 
  p.name,
  SUM(ti.quantity) as total_sold,
  SUM(ti.subtotal) as total_revenue
FROM products p
JOIN transaction_items ti ON p.id = ti.product_id
GROUP BY p.id, p.name
ORDER BY total_revenue DESC;
```

## Troubleshooting

### Connection Failed
- Check MySQL is running
- Verify credentials in `.env.local`
- Ensure database `dhani_dhanya` exists

### Tables Not Created
- Run the SQL script again
- Check for error messages in MySQL

### Data Not Syncing
- Check browser console for errors
- Verify API endpoints are working: `/api/db-test`
- Check MySQL user has proper permissions

## API Endpoints

- `GET /api/db-test` - Test database connection
- `GET /api/products` - Get all products
- `POST /api/products` - Save/update products
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
