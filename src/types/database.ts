export interface Contractor {
  id: string;
  user_id: string;
  business_name: string;
  trade_category: string;
  google_review_url: string;
  phone: string;
  email: string;
  billing_status: 'pending' | 'active' | 'cancelled';
  plan: 'free' | 'pro';
  created_at: string;
}

export interface Escalation {
  id: string;
  contractor_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  message: string;
  status: 'open' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  resolved_at: string | null;
}

export interface ErrorLog {
  id: string;
  error_type: string;
  message: string;
  stack_trace: string | null;
  path: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface EscalationFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  message: string;
}
