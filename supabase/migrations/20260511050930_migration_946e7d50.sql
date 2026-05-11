-- Enable RLS untuk semua tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Categories (public read)
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
CREATE POLICY "admin_manage_categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies: Stores (public read, seller manage own)
CREATE POLICY "public_read_stores" ON stores FOR SELECT USING (is_active = true);
CREATE POLICY "seller_insert_store" ON stores FOR INSERT WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('seller', 'admin'))
);
CREATE POLICY "seller_update_own_store" ON stores FOR UPDATE USING (
  auth.uid() = user_id
);

-- RLS Policies: Products (public read active, seller manage own)
CREATE POLICY "public_read_products" ON products FOR SELECT USING (
  is_active = true OR 
  EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
);
CREATE POLICY "seller_insert_product" ON products FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
);
CREATE POLICY "seller_update_own_product" ON products FOR UPDATE USING (
  EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
);
CREATE POLICY "seller_delete_own_product" ON products FOR DELETE USING (
  EXISTS (SELECT 1 FROM stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
);

-- RLS Policies: Orders (buyer and seller can read own)
CREATE POLICY "user_read_own_orders" ON orders FOR SELECT USING (
  auth.uid() = buyer_id OR 
  EXISTS (SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid())
);
CREATE POLICY "buyer_insert_order" ON orders FOR INSERT WITH CHECK (
  auth.uid() = buyer_id
);

-- RLS Policies: Order Items (through orders)
CREATE POLICY "user_read_own_order_items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id AND 
    (orders.buyer_id = auth.uid() OR 
     EXISTS (SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()))
  )
);

-- RLS Policies: Payments (through orders)
CREATE POLICY "user_read_own_payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = payments.order_id AND 
    (orders.buyer_id = auth.uid() OR 
     EXISTS (SELECT 1 FROM stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid()))
  )
);

-- RLS Policies: Affiliates (user manage own)
CREATE POLICY "user_read_own_affiliates" ON affiliates FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM products JOIN stores ON products.store_id = stores.id WHERE products.id = affiliates.product_id AND stores.user_id = auth.uid())
);
CREATE POLICY "user_create_affiliate" ON affiliates FOR INSERT WITH CHECK (
  auth.uid() = user_id
);
CREATE POLICY "user_update_own_affiliate" ON affiliates FOR UPDATE USING (
  auth.uid() = user_id
);

-- RLS Policies: Affiliate Clicks (affiliate can read own)
CREATE POLICY "affiliate_read_own_clicks" ON affiliate_clicks FOR SELECT USING (
  EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_clicks.affiliate_id AND affiliates.user_id = auth.uid())
);

-- RLS Policies: Affiliate Earnings (user can read own)
CREATE POLICY "user_read_own_earnings" ON affiliate_earnings FOR SELECT USING (
  EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_earnings.affiliate_id AND affiliates.user_id = auth.uid())
);

-- RLS Policies: Withdrawals (user manage own)
CREATE POLICY "user_read_own_withdrawals" ON withdrawals FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "user_create_withdrawal" ON withdrawals FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

-- RLS Policies: Settings (public read, admin manage)
CREATE POLICY "public_read_settings" ON settings FOR SELECT USING (true);
CREATE POLICY "admin_manage_settings" ON settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies: Notifications (user read own)
CREATE POLICY "user_read_own_notifications" ON notifications FOR SELECT USING (
  auth.uid() = user_id
);
CREATE POLICY "user_update_own_notifications" ON notifications FOR UPDATE USING (
  auth.uid() = user_id
);

-- Create indexes untuk performance
CREATE INDEX idx_stores_user_id ON stores(user_id);
CREATE INDEX idx_stores_username ON stores(username);
CREATE INDEX idx_products_store_id ON products(store_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(store_id, slug);
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX idx_affiliates_product_id ON affiliates(product_id);
CREATE INDEX idx_affiliate_clicks_affiliate_id ON affiliate_clicks(affiliate_id);
CREATE INDEX idx_affiliate_earnings_affiliate_id ON affiliate_earnings(affiliate_id);
CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read);