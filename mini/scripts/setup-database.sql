-- Create database
CREATE DATABASE IF NOT EXISTS dhani_dhanya;
USE dhani_dhanya;

-- Products table
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

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  items_count INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction items table
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

-- Indexes for better performance
CREATE INDEX idx_products_expiry ON products(days_to_expiry);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transaction_items_transaction ON transaction_items(transaction_id);
CREATE INDEX idx_transaction_items_product ON transaction_items(product_id);
