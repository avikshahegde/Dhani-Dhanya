# 🚀 Quick Start Guide

## For Windows Users - 5 Minute Setup

### Prerequisites
- Windows 10/11
- Internet connection

### Step 1: Install Required Software

**Install Node.js:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install LTS version
3. Restart your computer

**Install MySQL:**
1. Go to [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
2. Download MySQL Community Server
3. Install with default settings
4. **Remember your root password!**

### Step 2: Get the Project
1. Download/clone this project to your computer
2. Open Command Prompt in the project folder
3. Run the setup script:
   ```cmd
   setup.bat
   ```

### Step 3: Setup Database
1. Open Command Prompt as Administrator
2. Login to MySQL:
   ```cmd
   mysql -u root -p
   ```
3. Copy and paste everything from `scripts/quick-setup.sql`
4. Type `exit;` to close MySQL

### Step 4: Configure Database
1. Open `.env.local` file in notepad
2. Replace the password line:
   ```
   DB_PASSWORD=your_mysql_password_here
   ```
3. Save the file

### Step 5: Start the App
```cmd
npm run dev
```

### Step 6: Test Everything
1. Open browser: `http://localhost:3000`
2. Check database: `http://localhost:3000/db-status`
3. Upload data: `http://localhost:3000/upload`
4. Test POS: `http://localhost:3000/pos`

## ✅ That's it! 

Your system is now running with:
- ✅ Dynamic pricing engine
- ✅ MySQL database integration
- ✅ Real-time inventory management
- ✅ POS system with transaction recording

---

## 🆘 Having Issues?

**Common fixes:**
- Restart your computer after installing Node.js
- Make sure MySQL service is running
- Check your password in `.env.local`
- Try `npm install --legacy-peer-deps --force`

**Need detailed help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)