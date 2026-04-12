-- Atlantic Bridge Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension (should already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- QUOTES TABLE
-- Stores all quote requests from the multi-step form
-- ============================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Service type (required)
  service_type TEXT NOT NULL CHECK (service_type IN (
    'product-sourcing',
    'bulk-purchasing',
    'vehicle-procurement',
    'vehicle-shipping',
    'cargo-shipping'
  )),

  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new',
    'contacted',
    'quoted',
    'closed'
  )),

  -- Contact information (common fields)
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  additional_notes TEXT,

  -- Service-specific data stored as JSON
  -- This allows flexibility for different service types
  form_data JSONB DEFAULT '{}'::jsonb,

  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes (status);
CREATE INDEX IF NOT EXISTS idx_quotes_service_type ON quotes (service_type);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes (email);

-- ============================================
-- CONTACTS TABLE
-- Stores general contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new',
    'read',
    'replied',
    'closed'
  )),

  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- Stores newsletter subscription data
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Subscriber information
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,

  -- Where they signed up from
  source TEXT DEFAULT 'footer',

  -- For tracking unsubscribes
  unsubscribed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed ON newsletter_subscribers (subscribed);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS for security - DENY all access by default
-- The service role key bypasses RLS entirely, so no policies needed for API routes
-- ============================================

-- Enable RLS on all tables (this blocks anon/authenticated roles by default)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: We intentionally DO NOT create any permissive policies.
-- With RLS enabled and no policies, anon and authenticated roles cannot access these tables.
-- The service_role key (used by our API routes) bypasses RLS entirely.
-- This is the most secure approach for server-side only tables.

-- If you need to create an admin dashboard later, add policies like:
-- CREATE POLICY "Admins can manage quotes"
--   ON quotes
--   FOR ALL
--   TO authenticated
--   USING (auth.jwt() ->> 'role' = 'admin')
--   WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE quotes IS 'Stores quote requests from the multi-step quote form';
COMMENT ON TABLE contacts IS 'Stores general contact form submissions';
COMMENT ON TABLE newsletter_subscribers IS 'Stores newsletter email subscriptions';

COMMENT ON COLUMN quotes.form_data IS 'JSONB field storing service-specific form data (product details, vehicle info, etc.)';
COMMENT ON COLUMN quotes.service_type IS 'Type of service requested: product-sourcing, bulk-purchasing, vehicle-procurement, vehicle-shipping, cargo-shipping';
COMMENT ON COLUMN quotes.status IS 'Current status: new (unprocessed), contacted (reached out), quoted (sent quote), closed (completed or declined)';
