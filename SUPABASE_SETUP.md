# Supabase Setup Guide for Rose Palace Gym

To get the contact form working, you need to set up a table in your Supabase project.

## 1. Create the Table
Run this SQL in your Supabase SQL Editor:

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  mobile text not null,
  email text not null,
  message text not null
);

-- Turn on Row Level Security (RLS)
alter table contact_submissions enable row level security;

-- Allow anonymous users to insert data (for the contact form)
create policy "Allow anonymous submissions" 
on contact_submissions for insert 
with check (true);
```

## 2. Configure Environment Variables
You need to provide your Supabase credentials. Find these in your Supabase project settings under **Project Settings -> API**.

1. Click on the **Settings** gear icon in AI Studio.
2. Add the following variables:
   - `VITE_SUPABASE_URL`: Your Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Anonymous key

---

# Vercel Deployment Guide

To deploy this to Vercel:

1. **Export the Code**: In the AI Studio settings menu, choose **Download as ZIP** or **Export to GitHub**.
2. **Push to GitHub**: If you downloaded a ZIP, push it to a new GitHub repository.
3. **Import to Vercel**: 
   - Go to [vercel.com](https://vercel.com) and click **Add New -> Project**.
   - Import your GitHub repository.
   - **Environment Variables**: During the import, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
   - Click **Deploy**.

Vercel will automatically detect the Vite setup and deploy your high-end Rose Palace Gym website!
