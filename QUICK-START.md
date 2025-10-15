# 🚀 QUICK START GUIDE - ACTION REQUIRED!

## ⚠️ IMPORTANT: Complete This Step Before Using the Application

Your server is running, but you MUST create database tables in Supabase first!

---

## 🎯 Step-by-Step Setup (5 minutes)

### **STEP 1: Open Supabase SQL Editor**

Click this link to open your SQL Editor:
👉 https://supabase.com/dashboard/project/mbaaissbqqemmeibiodz/editor

### **STEP 2: Copy the SQL Script**

1. Open the file `supabase-schema.sql` in your project folder
2. Press `Ctrl + A` to select all
3. Press `Ctrl + C` to copy

### **STEP 3: Run the Script**

1. In the Supabase SQL Editor, paste the script (`Ctrl + V`)
2. Click the **"Run"** button (or press `Ctrl + Enter`)
3. Wait for the success message

### **STEP 4: Verify Tables Were Created**

1. Go to: https://supabase.com/dashboard/project/mbaaissbqqemmeibiodz/editor
2. Click "Table Editor" in the left sidebar
3. You should see three tables:
   - ✅ events
   - ✅ users
   - ✅ event_registrations

### **STEP 5: Test Your Application**

1. Your server is already running at: http://localhost:3000
2. Open your browser and go to: http://localhost:3000
3. Try registering a new user
4. Login with admin credentials:
   - Email: admin@gmail.com
   - Password: admin

---

## 📋 Quick Test Checklist

After setting up the database, test these:

1. ✅ Visit home page: http://localhost:3000
2. ✅ Register a new user
3. ✅ Login as admin: http://localhost:3000/loginUser
4. ✅ Access admin panel: http://localhost:3000/admindashboard
5. ✅ Create a new event
6. ✅ View all events

---

## 🆘 Having Issues?

### **Tables not showing up?**
- Make sure you clicked "Run" in the SQL Editor
- Check for any error messages in the SQL Editor

### **Server not running?**
```powershell
npm run dev
```

### **Port 3000 in use?**
```powershell
Stop-Process -Name "node" -Force
npm run dev
```

---

## 📁 Important Files

- `supabase-schema.sql` - Database schema (run this in Supabase)
- `SUPABASE-SETUP-GUIDE.md` - Complete documentation
- `index.js` - Main server file
- `.env` - Configuration

---

## ✅ All Set!

Once you complete these steps, your application will be fully functional!

**Need more details?** Check `SUPABASE-SETUP-GUIDE.md`

---

**Your Application:** http://localhost:3000  
**Admin Panel:** http://localhost:3000/admindashboard  
**Supabase Dashboard:** https://supabase.com/dashboard/project/mbaaissbqqemmeibiodz
