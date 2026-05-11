export type UserRole = "admin" | "seller" | "buyer" | "affiliate";

export type OrderStatus = "unpaid" | "paid" | "expired" | "failed" | "refunded";

export type PaymentStatus = "UNPAID" | "PAID" | "EXPIRED" | "FAILED" | "REFUND";

export type ProductType = "file" | "link" | "license" | "course";

export type WithdrawalStatus = "pending" | "approved" | "rejected" | "paid";

export type NotificationType = "order" | "payment" | "withdrawal" | "affiliate" | "system";

export type AffiliateEarningStatus = "pending" | "approved" | "paid";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  wallet_balance: number;
  username: string | null;
  phone: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Store {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  social_links: Record<string, string>;
  is_active: boolean;
  total_products: number;
  total_sales: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  thumbnail_url: string | null;
  gallery_urls: string[];
  product_type: ProductType;
  file_url: string | null;
  external_link: string | null;
  license_key: string | null;
  instructions: string | null;
  is_affiliate_enabled: boolean;
  affiliate_commission_percentage: number;
  tags: string[];
  total_sales: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  buyer_id: string;
  store_id: string;
  total_amount: number;
  affiliate_id: string | null;
  affiliate_commission: number;
  status: OrderStatus;
  payment_method: string | null;
  payment_reference: string | null;
  paid_at: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_title: string;
  product_price: number;
  quantity: number;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  tripay_reference: string;
  merchant_ref: string;
  payment_method: string;
  payment_name: string | null;
  amount: number;
  fee: number;
  total_amount: number;
  status: PaymentStatus;
  pay_url: string | null;
  checkout_url: string | null;
  qr_url: string | null;
  paid_at: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Affiliate {
  id: string;
  user_id: string;
  product_id: string;
  affiliate_code: string;
  total_clicks: number;
  total_conversions: number;
  total_earnings: number;
  is_active: boolean;
  created_at: string;
}

export interface AffiliateClick {
  id: string;
  affiliate_id: string;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

export interface AffiliateEarning {
  id: string;
  affiliate_id: string;
  order_id: string;
  commission_amount: number;
  commission_percentage: number;
  status: AffiliateEarningStatus;
  created_at: string;
}

export interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: WithdrawalStatus;
  admin_note: string | null;
  processed_at: string | null;
  processed_by: string | null;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  description: string | null;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  metadata: Record<string, any>;
  created_at: string;
}