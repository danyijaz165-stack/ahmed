# Vercel Deployment - MongoDB Connection Fix

## ❌ Problem: Database Connection Timeout

Agar Vercel par "Database connection timeout" error aa raha hai, ye steps follow karo:

## ✅ Solution Steps

### Step 1: MongoDB Atlas Network Access Setup (CRITICAL!)

1. MongoDB Atlas Dashboard par jao: https://cloud.mongodb.com/
2. Apne project ko select karo
3. Left sidebar se **Network Access** click karo
4. **Add IP Address** button click karo
5. **Allow Access from Anywhere** option select karo (0.0.0.0/0)
6. **Confirm** click karo
7. Wait karo (1-2 minutes) taake changes apply ho jayein

**⚠️ IMPORTANT:** Vercel serverless functions ka IP address har baar change hota hai, isliye 0.0.0.0/0 (all IPs) allow karna zaroori hai.

### Step 2: Vercel Environment Variables

1. Vercel Dashboard: https://vercel.com/dashboard
2. Apne project ko select karo
3. **Settings** tab click karo
4. **Environment Variables** section mein jao
5. **Add New** click karo
6. Ye add karo:

**Key:** `MONGODB_URI`

**Value:** Apna MongoDB connection string
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecolight?retryWrites=true&w=majority
```

**Important:**
- Replace `username` with your MongoDB username
- Replace `password` with your MongoDB password (special characters encode karo)
- Replace `cluster0.xxxxx` with your cluster URL
- Replace `ecolight` with your database name

7. **Environments** select karo: Production, Preview, Development (sab)
8. **Save** click karo

### Step 3: Redeploy Project

1. Vercel Dashboard mein **Deployments** tab par jao
2. Latest deployment ke side mein **⋯** (three dots) click karo
3. **Redeploy** select karo
4. **Redeploy** button click karo

Ya phir:
- GitHub par new commit push karo (automatic redeploy hoga)

### Step 4: Verify Connection

1. Vercel Dashboard → **Deployments** → Latest deployment
2. **Functions** tab click karo
3. Koi bhi function click karo
4. **Logs** check karo
5. Ye message dikhna chahiye: `✅ MongoDB connected successfully`

## 🔍 Testing

1. Apni Vercel site par sign up page kholo
2. Test account banao
3. Agar abhi bhi error aaye, to Vercel logs check karo

## 🐛 Troubleshooting

### Error: "Database connection timeout"
**Solution:**
- MongoDB Atlas Network Access mein 0.0.0.0/0 add karo
- Connection string verify karo
- Vercel environment variables properly set hain ya nahi check karo

### Error: "Authentication failed"
**Solution:**
- MongoDB username/password verify karo
- Password mein special characters properly encode karo (%40 for @, etc.)

### Error: "ENOTFOUND"
**Solution:**
- Cluster URL verify karo
- Connection string properly formatted hai ya nahi check karo

## 📝 Quick Checklist

- [ ] MongoDB Atlas Network Access: 0.0.0.0/0 added
- [ ] Vercel Environment Variable: MONGODB_URI set kiya
- [ ] Environment: Production, Preview, Development sab mein set kiya
- [ ] Project redeployed
- [ ] Vercel logs check kiye - "MongoDB connected successfully" message dikha

## 💡 Tips

1. MongoDB Atlas mein Network Access changes apply hone mein 1-2 minutes lag sakte hain
2. Vercel environment variables add karne ke baad redeploy karna zaroori hai
3. Connection string mein spaces nahi hone chahiye
4. Password mein special characters ko URL encode karo






