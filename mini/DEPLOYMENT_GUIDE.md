# 🚀 Complete Deployment Guide - Dhani Dhanya

This guide will help you set up the Dhani Dhanya project on any Windows laptop from scratch.

## 📋 Prerequisites Installation

### Step 1: Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download **LTS version** (recommended)
3. Run the installer and follow the setup wizard
4. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

### Step 2: Install MySQL Server
1. Go to [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
2. Download **MySQL Community Server** for Windows
3. Run the installer and choose **Developer Default**
4. During setup:
   - Set root password (remember this!)
   - Choose **Use Strong Password Encryption**
   - Start MySQL as Windows Service
5. Verify installation:
   ```cmd
   mysql --version
   ```

### Step 3: Install Git (if not already installed)
1. Go to [git-scm.com](https://git-scm.com/)
2. Download Git for Windows
3. Install with default settings
4. Verify:
   ```cmd
   git --version
   ```

## 📁 Project Setup

### Step 4: Clone the Project
1. Open Command Prompt or PowerShell
2. Navigate to where you want the project:
   ```cmd
   cd C:\Users\%USERNAME%\Desktop
   ```
3. Clone the repository:
   ```cmd
   git clone <your-repository-url>
   cd mini
   ```

### Step 5: Install Dependencies
```cmd
npm install --legacy-peer-deps
```

## 🗄️ Database Setup

### Step 6: Create MySQL Database
1. Open Command Prompt as Administrator
2. Login to MySQL:
   ```cmd
   mysql -u root -p
   ```
   Enter your MySQL root password

3. Create the database:
   ```sql
   CREATE DATABASE dhani_dhanya;
   USE dhani_dhanya;
   ```

4. Create tables by copying and pasting this SQL:
   ```sql
   CREATE TABLE IF NOT EXISTS products (
     id VARCHAR(255) PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     store VARCHAR(255) NOT NULL,
     category VARCHAR(255) NOT NULL,
     stock INT NOT NULL,
     days_to_expiry INT NOT NULL,
     original_price DECIMAL(10, 2) NOT NULL,
     current_price DECIMAL(10, 2) NOT NULL,
     discount DECIMAL(5, 2) DEFAULT 0,
     sales_velocity DECIMAL(10, 2) DEFAULT 0,
     alert_expiry BOOLEAN DEFAULT FALSE,
     alert_stock BOOLEAN DEFAULT FALSE,
     alert_sales_velocity BOOLEAN DEFAULT FALSE,
     alert_other BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS transactions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     subtotal DECIMAL(10, 2) NOT NULL,
     tax DECIMAL(10, 2) NOT NULL,
     total DECIMAL(10, 2) NOT NULL,
     items_count INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS transaction_items (
     id INT AUTO_INCREMENT PRIMARY KEY,
     transaction_id INT NOT NULL,
     product_id VARCHAR(255) NOT NULL,
     product_name VARCHAR(255) NOT NULL,
     quantity INT NOT NULL,
     unit_price DECIMAL(10, 2) NOT NULL,
     original_price DECIMAL(10, 2) NOT NULL,
     discount DECIMAL(5, 2) DEFAULT 0,
     subtotal DECIMAL(10, 2) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
   );

   CREATE INDEX idx_products_expiry ON products(days_to_expiry);
   CREATE INDEX idx_products_stock ON products(stock);
   CREATE INDEX idx_products_category ON products(category);
   CREATE INDEX idx_transactions_date ON transactions(transaction_date);
   CREATE INDEX idx_transaction_items_transaction ON transaction_items(transaction_id);
   CREATE INDEX idx_transaction_items_product ON transaction_items(product_id);
   ```

5. Verify tables were created:
   ```sql
   SHOW TABLES;
   ```
   You should see: products, transactions, transaction_items

6. Exit MySQL:
   ```sql
   exit;
   ```

### Step 7: Configure Database Connection
1. In the project folder, create `.env.local` file:
   ```cmd
   notepad .env.local
   ```

2. Add this content (replace `your_password` with your MySQL root password):
   ```env
   # MySQL Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=dhani_dhanya
   ```

3. Save and close the file

## 🚀 Running the Application

### Step 8: Start the Development Server
```cmd
npm run dev
```

### Step 9: Test the Application
1. Open your browser
2. Go to: `http://localhost:3000` (or 3001 if 3000 is busy)
3. You should see the Dhani Dhanya homepage

### Step 10: Verify Database Connection
1. Go to: `http://localhost:3000/db-status`
2. You should see:
   - ✅ Database connection successful
   - 0 Products in Database
   - 0 Transactions in Database

## 📊 Testing the Complete System

### Step 11: Upload Sample Data
1. Go to: `http://localhost:3000/upload`
2. Upload a CSV file with columns:
   - Product, Store, Category, Stock, Expiry (Days Left), Original Price, Current Price, Sales Velocity
3. After upload, check `/db-status` - you should see products in database

### Step 12: Test POS System
1. Go to: `http://localhost:3000/pos`
2. Add items to cart
3. Process payment
4. You should see: "Transaction saved to database ✓"
5. Check `/db-status` - you should see transactions recorded

### Step 13: Verify in MySQL
```cmd
mysql -u root -p
USE dhani_dhanya;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM transactions;
```

## 🔧 Troubleshooting

### Common Issues:

**1. "npm install" fails:**
```cmd
npm install --legacy-peer-deps --force
```

**2. MySQL connection failed:**
- Check MySQL service is running: `services.msc` → MySQL80
- Verify password in `.env.local`
- Try: `mysql -u root -p` to test connection

**3. Port 3000 already in use:**
- The app will automatically use port 3001
- Or kill the process using port 3000

**4. Database tables not created:**
- Re-run the SQL commands
- Check for error messages in MySQL

**5. "Module not found" errors:**
```cmd
npm install
npm run dev
```

## 📁 Project Structure
```
mini/
├── app/                 # Next.js pages
├── components/          # UI components
├── lib/                # Database and utilities
├── scripts/            # Database setup scripts
├── .env.local          # Database configuration
├── package.json        # Dependencies
└── README.md           # Project documentation
```

## 🎯 Quick Start Checklist

- [ ] Node.js installed
- [ ] MySQL installed and running
- [ ] Project cloned
- [ ] Dependencies installed (`npm install --legacy-peer-deps`)
- [ ] Database created (`dhani_dhanya`)
- [ ] Tables created (3 tables)
- [ ] `.env.local` configured with MySQL password
- [ ] App running (`npm run dev`)
- [ ] Database connection verified (`/db-status`)
- [ ] Sample data uploaded and tested

## 🆘 Need Help?

If you encounter any issues:
1. Check the error messages in the terminal
2. Verify MySQL is running
3. Check `.env.local` configuration
4. Try restarting the development server
5. Check browser console for errors

---

**🎉 Congratulations!** Your Dhani Dhanya system is now running with full MySQL integration!