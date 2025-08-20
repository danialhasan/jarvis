# Supabase CRM Setup Guide

This guide helps you upgrade from simple markdown files to a full-featured CRM system using Supabase, similar to Danial's HasanLabs setup.

## 🗄️ What is Supabase?

**Supabase** is an open-source alternative to Firebase that provides:

### Core Features
- **PostgreSQL Database**: Real database (not just key-value storage)
- **Authentication**: User login/signup built-in
- **Real-time Updates**: Changes sync instantly across devices
- **RESTful API**: Automatically generated from your database schema
- **Dashboard**: Web interface to view and edit your data
- **Storage**: File uploads and management

### Why Use It for CRM?
- **Structured Data**: Store contacts, interactions, goals with relationships
- **Advanced Queries**: Find contacts by complex criteria (location + role + last interaction date)
- **Scalability**: Handles thousands of contacts without performance issues
- **Multi-device**: Access your CRM from laptop, phone, anywhere
- **Backup & Security**: Professional-grade data protection
- **No Vendor Lock-in**: Can export your data anytime

### Think of it as:
- **Google Sheets** but with proper relationships and faster queries
- **Airtable** but with more powerful database features
- **Notion** but optimized for structured business data
- **Excel** but accessible from AI and multiple devices simultaneously

**Simple analogy**: If markdown files are like sticky notes, Supabase is like having a professional filing cabinet with smart search.

## 🎯 When to Use Supabase

**Upgrade from markdown files when you need**:
- 50+ contacts to manage
- Structured relationship tracking
- Advanced search and filtering
- Multi-device access to your data
- Business relationship analytics

## 🚀 Quick Supabase Setup

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Choose organization and region
5. Set database password (save this!)
6. Wait for project creation (~2 minutes)

### Step 2: Get Your Credentials

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key**
4. Copy your **service_role key** (keep this secret!)

### Step 3: Add to Claude Code

```bash
# Add Supabase MCP server
claude mcp add supabase "npx -y @supabase/mcp-server-supabase@latest --access-token YOUR_SERVICE_ROLE_KEY"
```

Replace `YOUR_SERVICE_ROLE_KEY` with your actual service role key.

## 📊 CRM Database Schema

### Core Tables Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Core people/contacts table
CREATE TABLE people (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    company TEXT,
    role TEXT,
    category TEXT CHECK (category IN ('role_model', 'client', 'warm_lead', 'cold_lead', 'colleague', 'mentor', 'service_provider')),
    temperature TEXT DEFAULT 'cold' CHECK (temperature IN ('hot', 'warm', 'cold', 'dormant')),
    revenue_potential INTEGER,
    linkedin_url TEXT,
    twitter_handle TEXT,
    website TEXT,
    location TEXT,
    metadata JSONB DEFAULT '{}',
    last_interaction_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions/touchpoints log
CREATE TABLE interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    person_id UUID REFERENCES people(id),
    type TEXT NOT NULL CHECK (type IN ('email_sent', 'email_received', 'meeting', 'call', 'workshop', 'linkedin_message', 'introduction', 'social_media')),
    direction TEXT CHECK (direction IN ('inbound', 'outbound', 'mutual')),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    subject TEXT,
    content TEXT,
    outcome TEXT CHECK (outcome IN ('positive', 'neutral', 'negative', 'no_response', 'follow_up_needed')),
    next_action TEXT,
    next_action_date DATE,
    external_id TEXT, -- Gmail message ID, Calendar event ID, etc.
    external_type TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals/opportunities/todos
CREATE TABLE goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('follow_up', 'opportunity', 'project', 'learning', 'relationship', 'revenue')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'on_hold')),
    value INTEGER, -- Deal size for opportunities, importance score for others
    probability NUMERIC, -- 0-1 for opportunity probability
    due_date DATE,
    completed_at TIMESTAMPTZ,
    person_id UUID REFERENCES people(id),
    related_people UUID[], -- Array of person UUIDs
    linear_issue_id TEXT,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notes/knowledge base
CREATE TABLE notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    person_id UUID REFERENCES people(id),
    title TEXT,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('meeting_notes', 'research', 'strategy', 'personal', 'technical', 'general')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust auth as needed)
CREATE POLICY "Enable all operations for authenticated users" ON people FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all operations for authenticated users" ON interactions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all operations for authenticated users" ON goals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all operations for authenticated users" ON notes FOR ALL USING (auth.role() = 'authenticated');
```

## 🔧 Claude Code Integration

### Basic CRM Commands

Once Supabase is connected, you can use natural language:

```bash
# Contact management
"Add John Doe as a warm lead at TechCorp with email john@techcorp.com"
"Find all clients I haven't contacted in 2 weeks"
"Update Sarah's status to hot lead after yesterday's call"

# Interaction tracking
"Log that I had a meeting with Mike about the Q4 project"
"Find all email interactions with leads from last month"
"Schedule follow-up calls for pending opportunities"

# Goal/opportunity tracking
"Create a revenue opportunity for $50k with high probability for Apple project"
"Show me all overdue follow-ups"
"Mark the Google partnership goal as completed"

# Notes and research
"Add meeting notes for today's call with the CarGO team"
"Find all research notes about healthcare automation"
"Create a strategy note about Q1 sales approach"
```

### Advanced Queries

```bash
# Business intelligence
"Show me revenue opportunities over $25k with high probability"
"Find dormant contacts who might be worth re-engaging"
"Analyze interaction patterns with my top 10 clients"

# Relationship mapping
"Show me connections between people at the same company"
"Find mutual connections for warm introductions"
"Track relationship temperature changes over time"
```

## 📈 Upgrading from Markdown

### Migration Process

If you start with markdown files and want to upgrade:

```bash
# In Claude Code:
"Read my contacts.md file and import all contacts to my Supabase people table"
"Import my meetings.md file as interactions in the database"
"Convert my todo list into goals in the Supabase goals table"
```

### Hybrid Approach

You can use both systems:
- **Supabase**: Structured business data (contacts, opportunities, interactions)
- **Markdown**: Personal notes, brain dumps, meeting transcripts

## 🎛️ Supabase Dashboard

### Accessing Your Data

1. **Supabase Dashboard**: Direct table editing and querying
2. **Claude Code**: Natural language interface
3. **SQL Editor**: Advanced queries and reports
4. **API Access**: Build custom integrations

### Useful Dashboard Features

- **Table Editor**: Visual contact management
- **SQL Editor**: Custom reports and analytics
- **Auth**: User management if sharing with team
- **Storage**: File attachments for contacts/notes
- **Realtime**: Live updates across devices

## 💰 Supabase Pricing

### Free Tier (Sufficient for personal CRM)
- 2 projects
- 50MB database storage
- 50MB file storage
- 2GB bandwidth
- 50,000 monthly active users

### Pro Plan ($25/month per project)
- Unlimited projects
- 8GB database storage
- 100GB file storage
- 250GB bandwidth
- Point-in-time recovery

**Recommendation**: Free tier works for most personal CRM needs.

## 🔗 Integration Examples

### Email → CRM Auto-sync
```bash
"Read my emails from today and automatically create interaction records for any business contacts"
```

### Calendar → Follow-ups
```bash
"Review my calendar from last week and create follow-up goals for all client meetings"
```

### LinkedIn → Contact Import
```bash
"Add [LinkedIn profile] as a new contact with role_model category"
```

## 📚 Resources

- **Supabase Documentation**: https://supabase.com/docs
- **SQL Tutorial**: https://supabase.com/docs/guides/database
- **MCP Supabase Server**: https://github.com/supabase/mcp-server-supabase
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security

## 🎯 Success Metrics

You'll know the CRM is working when:
- Contact information syncs automatically from emails/meetings
- Follow-up reminders are generated automatically
- You can query your relationship history with natural language
- Business opportunities are tracked with probability and value

**Start simple with markdown, upgrade when you need structure!**