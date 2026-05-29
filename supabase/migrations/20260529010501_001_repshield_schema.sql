/*
  # RepShield Initial Schema

  1. New Tables
    - `contractors`
      - `id` (uuid, primary key) — unique contractor identifier
      - `user_id` (uuid, foreign key to auth.users) — links to Supabase auth
      - `business_name` (text) — contractor's business name
      - `trade_category` (text) — business trade/category (e.g., HVAC, Plumber)
      - `google_review_url` (text) — URL to their Google Business Profile review page
      - `phone` (text) — business phone number
      - `email` (text) — business email
      - `billing_status` (text, default 'pending') — subscription status: pending, active, cancelled
      - `plan` (text, default 'free') — current plan tier
      - `created_at` (timestamptz) — registration timestamp

    - `escalations`
      - `id` (uuid, primary key) — unique escalation identifier
      - `contractor_id` (uuid, foreign key to contractors) — which contractor this belongs to
      - `customer_name` (text) — name of the customer who escalated
      - `customer_email` (text) — email of the customer
      - `customer_phone` (text, optional) — phone of the customer
      - `message` (text) — the escalation message
      - `status` (text, default 'open') — escalation status: open, resolved
      - `priority` (text, default 'high') — priority level
      - `created_at` (timestamptz) — when escalation was submitted
      - `resolved_at` (timestamptz, optional) — when escalation was resolved

    - `error_logs`
      - `id` (uuid, primary key) — unique log entry identifier
      - `error_type` (text) — HTTP error code or exception type
      - `message` (text) — error message
      - `stack_trace` (text, optional) — stack trace if available
      - `path` (text) — request path or component where error occurred
      - `metadata` (jsonb, default '{}') — additional contextual data
      - `created_at` (timestamptz) — when the error was logged

  2. Security
    - Enable RLS on all tables
    - Contractors can read/update their own records
    - Escalations are insertable by anyone (public customer form), readable by owning contractor
    - Error logs are restricted to service role only (admin access)
    - All tables have proper foreign key constraints

  3. Indexes
    - Index on escalations.contractor_id for fast inbox queries
    - Index on escalations.status for filtering open/resolved
    - Index on contractors.billing_status for activation lookups
*/

-- Contractors table
CREATE TABLE IF NOT EXISTS contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL DEFAULT '',
  trade_category text NOT NULL DEFAULT '',
  google_review_url text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  billing_status text NOT NULL DEFAULT 'pending',
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Escalations table
CREATE TABLE IF NOT EXISTS escalations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id uuid NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
  customer_name text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  customer_phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'high',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

-- Error logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_type text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  stack_trace text,
  path text NOT NULL DEFAULT '',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_escalations_contractor_id ON escalations(contractor_id);
CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
CREATE INDEX IF NOT EXISTS idx_contractors_billing_status ON contractors(billing_status);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at DESC);

-- Enable RLS
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Contractors policies
CREATE POLICY "Contractors can read own data"
  ON contractors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Contractors can update own data"
  ON contractors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Contractors can insert own data"
  ON contractors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Escalations policies
-- Public insert: customers need to submit escalations without auth
CREATE POLICY "Anyone can submit escalations"
  ON escalations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contractors can read escalations for their business
CREATE POLICY "Contractors can read own escalations"
  ON escalations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contractors
      WHERE contractors.id = escalations.contractor_id
      AND contractors.user_id = auth.uid()
    )
  );

-- Contractors can update (resolve) own escalations
CREATE POLICY "Contractors can update own escalations"
  ON escalations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contractors
      WHERE contractors.id = escalations.contractor_id
      AND contractors.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contractors
      WHERE contractors.id = escalations.contractor_id
      AND contractors.user_id = auth.uid()
    )
  );

-- Error logs: service role only (admin access via edge functions)
CREATE POLICY "Error logs are admin only"
  ON error_logs FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);
