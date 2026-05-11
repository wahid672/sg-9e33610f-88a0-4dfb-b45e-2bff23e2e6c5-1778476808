-- Categories untuk produk digital
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extend profiles dengan user roles dan wallet
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'buyer' CHECK (role IN ('admin', 'seller', 'buyer', 'affiliate'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL(12,2) DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- Stores untuk seller
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  social_links JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  total_products INTEGER DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products digital
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  discount_price DECIMAL(12,2),
  thumbnail_url TEXT,
  gallery_urls JSONB DEFAULT '[]',
  product_type TEXT NOT NULL CHECK (product_type IN ('file', 'link', 'license', 'course')),
  file_url TEXT,
  external_link TEXT,
  license_key TEXT,
  instructions TEXT,
  is_affiliate_enabled BOOLEAN DEFAULT false,
  affiliate_commission_percentage DECIMAL(5,2) DEFAULT 0,
  tags JSONB DEFAULT '[]',
  total_sales INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(store_id, slug)
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  total_amount DECIMAL(12,2) NOT NULL,
  affiliate_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  affiliate_commission DECIMAL(12,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'expired', 'failed', 'refunded')),
  payment_method TEXT,
  payment_reference TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  expired_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_title TEXT NOT NULL,
  product_price DECIMAL(12,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments (Tripay tracking)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  tripay_reference TEXT UNIQUE NOT NULL,
  merchant_ref TEXT UNIQUE NOT NULL,
  payment_method TEXT NOT NULL,
  payment_name TEXT,
  amount DECIMAL(12,2) NOT NULL,
  fee DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'UNPAID' CHECK (status IN ('UNPAID', 'PAID', 'EXPIRED', 'FAILED', 'REFUND')),
  pay_url TEXT,
  checkout_url TEXT,
  qr_url TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  expired_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliates tracking
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  affiliate_code TEXT UNIQUE NOT NULL,
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Affiliate clicks tracking
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Affiliate earnings
CREATE TABLE affiliate_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  commission_amount DECIMAL(12,2) NOT NULL,
  commission_percentage DECIMAL(5,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
  admin_note TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings global
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('order', 'payment', 'withdrawal', 'affiliate', 'system')),
  is_read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('E-book & Guides', 'ebook-guides', 'Digital books, tutorials, and comprehensive guides', 'BookOpen'),
  ('Templates & Design', 'templates-design', 'Website templates, graphics, and design assets', 'Palette'),
  ('Courses & Training', 'courses-training', 'Online courses, video tutorials, and training materials', 'GraduationCap'),
  ('Software & Tools', 'software-tools', 'Digital software, plugins, and productivity tools', 'Code'),
  ('Audio & Music', 'audio-music', 'Music tracks, sound effects, and audio files', 'Music'),
  ('Video & Animation', 'video-animation', 'Video templates, motion graphics, and animations', 'Video'),
  ('Photography', 'photography', 'Stock photos, presets, and photography resources', 'Camera'),
  ('Business & Marketing', 'business-marketing', 'Marketing materials, business templates, and resources', 'Briefcase');

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
  ('platform_commission', '{"percentage": 5}', 'Platform commission percentage from each sale'),
  ('default_affiliate_commission', '{"percentage": 10}', 'Default affiliate commission percentage'),
  ('withdrawal_minimum', '{"amount": 50000}', 'Minimum withdrawal amount'),
  ('smtp_config', '{"host": "", "port": 587, "username": "", "password": "", "from_name": "DigiMart"}', 'SMTP email configuration');