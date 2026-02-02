# 🗄️ Supabase Setup Guide

Quick setup guide for connecting the admin panel to Supabase.

---

## 🚀 Quick Start (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click **"New Project"**
4. Fill in:
   - **Name**: `portfolio`
   - **Password**: Generate strong password
   - **Region**: Choose closest to you
5. Click **"Create new project"**

### Step 2: Create Database Table

1. In Supabase dashboard → **SQL Editor**
2. Click **"New query"**
3. Paste this SQL:

```sql
-- Create the use_cases table
CREATE TABLE use_cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    industry VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'Case Study',
    title VARCHAR(500) NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image VARCHAR(500),
    href VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_use_cases_industry ON use_cases(industry);
CREATE INDEX idx_use_cases_date ON use_cases(date DESC);

-- Enable Row Level Security
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON use_cases FOR SELECT USING (true);

-- Allow all write operations (update for production!)
CREATE POLICY "Allow insert" ON use_cases FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON use_cases FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON use_cases FOR DELETE USING (true);
```

4. Click **"Run"**

### Step 3: Get API Keys

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

### Step 4: Configure Environment

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5: Restart & Test

```bash
# Restart dev server
npm run dev

# Open admin panel
# http://localhost:3000/admin
```

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] `use_cases` table exists
- [ ] `.env.local` file created with keys
- [ ] Dev server restarted
- [ ] Admin panel loads without errors
- [ ] Can create a use case
- [ ] Use case appears on industry page

---

## 🔧 Troubleshooting

### "Invalid API key"
- Check `.env.local` has no extra spaces
- Restart dev server after adding env vars

### "Table does not exist"
- Run the SQL migration in Supabase SQL Editor
- Check table name is exactly `use_cases`

### Data not showing on industry page
- Check `industry` field matches exactly (lowercase)
- Example: `"healthcare"` not `"Healthcare"`

---

## 📚 Related Files

| File | Purpose |
|------|---------|
| `services/supabase/client.ts` | Supabase connection |
| `services/supabase/use-cases.service.ts` | Database operations |
| `types/supabase.ts` | Database types |
| `supabase/migrations/001_create_use_cases.sql` | Full SQL schema |
