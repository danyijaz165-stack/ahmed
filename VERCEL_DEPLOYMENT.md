# Vercel Deployment Guide - MongoDB Connection Fix

## MongoDB Connection Timeout Issue Fix

### Step 1: MongoDB Atlas Network Access Setup

1. MongoDB Atlas dashboard mein jao: https://cloud.mongodb.com/
2. **Network Access** section mein jao
3. **Add IP Address** click karo
4. **Allow Access from Anywhere** select karo (0.0.0.0/0) - Ya specific Vercel IPs add karo
5. Save karo

### Step 2: Vercel Environment Variables Setup

1. Vercel dashboard mein apne project par jao
2. **Settings** → **Environment Variables** section mein jao
3. Ye environment variables add karo:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecolight?retryWrites=true&w=majority
```

**Important:**
- `username` ko apne MongoDB username se replace karo
- `password` ko apne MongoDB password se replace karo  
- `cluster0.xxxxx` ko apne cluster URL se replace karo
- `ecolight` database name hai (ya apna naam daalo)

### Step 3: Redeploy on Vercel

1. Environment variables add karne ke baad
2. **Settings** → **General** → **Redeploy** click karo
3. Ya latest commit push karo aur automatic redeploy hoga

### Step 4: Verify Connection

1. Vercel dashboard mein **Deployments** section mein jao
2. Latest deployment ke **Logs** check karo
3. "✅ MongoDB connected successfully" message dikhna chahiye

## Common Issues

### Issue: Database connection timeout
**Solution:** 
- MongoDB Atlas Network Access mein 0.0.0.0/0 add karo (all IPs allow)
- Connection timeout settings already increased (30 seconds)

### Issue: Authentication failed
**Solution:**
- MongoDB username/password verify karo
- MongoDB URI mein special characters properly encode karo

### Issue: DNS/ENOTFOUND error
**Solution:**
- Cluster URL verify karo
- Connection string properly formatted hai ya nahi check karo

## Test Connection

Sign up page par test karo - ab database connection properly work karni chahiye!

