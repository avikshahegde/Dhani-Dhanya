🌾 Dhani Dhanya - Smart Insights for Fresh Goods
An intelligent pricing system for grocery retailers that dynamically adjusts prices of perishable items based on expiry dates, inventory levels, and demand patterns. Reduce food waste, boost sales, and optimize stock management with AI-powered pricing decisions.

🗄️ Now with MySQL Database Integration - All inventory data and sales transactions are automatically stored in your MySQL database for persistent data management and analytics.

📖 Introduction
Dhani Dhanya is a modern web application designed to help grocery stores and retailers minimize losses from expired inventory while maximizing revenue. By implementing dynamic pricing strategies, the system automatically applies discounts to items approaching their expiry dates, ensuring faster turnover and reduced waste.

The platform provides real-time insights into inventory health, sales velocity, and pricing optimization, making it an essential tool for modern retail operations.

✨ Features
🎯 Core Capabilities
Dynamic Pricing Engine: Automatically adjusts prices based on expiry dates, stock levels, and sales velocity
Real-Time Dashboard: Monitor inventory status, pricing changes, and revenue impact at a glance
Rule-Based Discounting: Priority-based discount rules that apply the most relevant pricing strategy
POS Simulation: Test and visualize dynamic pricing in a point-of-sale environment
Analytics & Insights: Track waste reduction, revenue recovery, and product performance
CSV Data Import: Easy upload of inventory data for instant analysis
Glassmorphism UI: Modern, elegant interface with smooth animations and visual effects
📊 Pricing Rules
The system applies discounts based on the following priority order:

Critical Expiry (≤1 day): 50% discount
Near Expiry (≤3 days): 25% discount
High Stock (>150 units): 15% discount
Low Demand (<5 units/day): 10% discount
Only one discount is applied per product based on the highest priority match.

🗄️ Database Integration
MySQL Database: All data is automatically stored in MySQL for persistence
Real-time Sync: Inventory and transactions sync automatically
Data Analytics: Query your sales data directly from MySQL
Stock Management: Automatic stock level updates after each sale
🚀 How It Works
Step 1: Upload Your Data
Upload your inventory dataset in CSV format containing product information, stock levels, expiry dates, and sales data.

Step 2: Automatic Analysis
The AI engine analyzes your data and automatically calculates optimal pricing based on multiple factors including expiry urgency, inventory levels, and historical sales velocity.

Step 3: Monitor & Track
View real-time updates on your dashboard showing items at risk, revenue impact, and pricing adjustments. Track the effectiveness of dynamic pricing on waste reduction and profit recovery.

🛠️ How to Run
Prerequisites
Node.js (v18 or higher)
npm or pnpm package manager
MySQL Server (v8.0 or higher)
Installation
Clone the repository:
git clone <repository-url>
cd project
Install dependencies:
npm install --legacy-peer-deps
Setup MySQL Database:
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE dhani_dhanya;
USE dhani_dhanya;

# Run the setup script (copy from scripts/setup-database.sql)
Configure Database Connection: Create/update .env.local file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dhani_dhanya
Start the development server:
npm run dev
Open your browser and navigate to:
http://localhost:3000 (or 3001 if 3000 is in use)
Verify Database Connection: Visit: http://localhost:3000/db-status
Building for Production
npm run build
npm start
Database Setup Guide
For detailed database setup instructions, see: DATABASE_SETUP.md

📁 Dataset Format
Your CSV file should include the following columns:

Column	Description
Product	Name of the item
Category	Product category or department
Stock	Current inventory count
Expiry	Days until expiry
Original Price	Base price before discounts
Current Price	Price after discount application
Discount	Applied discount percentage
Sales Velocity	Average units sold per day
🎨 Technology Stack
Frontend: Next.js 15, React 19, TypeScript
Database: MySQL 8.0+ with mysql2 driver
Backend: Next.js API Routes
Styling: Tailwind CSS with custom glassmorphism effects
UI Components: Radix UI, shadcn/ui
Charts: Recharts
Icons: Lucide React
🌟 Key Benefits
✅ Reduce food waste by up to 50%
✅ Increase revenue from near-expiry items
✅ Improve inventory turnover rates
✅ Real-time pricing optimization
✅ Data-driven decision making
✅ Persistent data storage with MySQL
✅ Automatic transaction recording
✅ Real-time stock management
✅ Sales analytics and reporting
✅ Easy integration with existing systems
📞 Support
For questions or support, please open an issue in the repository.

Dhani Dhanya - Transforming fresh goods management with intelligent pricing.

🗄️ Database Features
Automatic Data Sync
Product Upload: CSV data automatically saves to MySQL
POS Transactions: Every sale is recorded in the database
Stock Updates: Inventory levels update in real-time
Transaction History: Complete sales history with item details
Database Tables
products: Store inventory data with pricing and alerts
transactions: Record sales transactions with totals and timestamps
transaction_items: Detailed line items for each transaction
MySQL Queries Examples
-- View products expiring soon
SELECT * FROM products WHERE days_to_expiry <= 3 ORDER BY days_to_expiry;

-- View today's transactions
SELECT * FROM transactions WHERE DATE(transaction_date) = CURDATE();

-- Top selling products
SELECT p.name, SUM(ti.quantity) as total_sold
FROM products p
JOIN transaction_items ti ON p.id = ti.product_id
GROUP BY p.id ORDER BY total_sold DESC;

-- Revenue by category
SELECT p.category, SUM(ti.subtotal) as revenue
FROM products p
JOIN transaction_items ti ON p.id = ti.product_id
GROUP BY p.category ORDER BY revenue DESC;
Database Status Page
Visit /db-status to monitor:

Database connection status
Total products in database
Total transactions recorded
