-- init.sql
-- Estrutura para os dados da nova amostra
-- Foco em modelagem normalizada e índices para performance

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- MERCHANTS (LOJAS)
-- =========================
CREATE TABLE merchant (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE INDEX idx_merchant_name ON merchant(name);

-- =========================
-- CUSTOMERS (CLIENTES)
-- =========================
CREATE TABLE customer (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    document_number VARCHAR(20),
    email TEXT,
    phone TEXT,
    orders_count INT
);
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_customer_document ON customer(document_number);

-- =========================
-- ORDERS (PEDIDOS)
-- =========================
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    merchant_id UUID REFERENCES merchant(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customer(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- DELIVERY / TAKEOUT
    display_id VARCHAR(50),
    created_at TIMESTAMP NOT NULL,
    persisted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    order_timing VARCHAR(20),
    preparation_start TIMESTAMP,
    extra_info TEXT
);
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created ON orders(created_at);

-- =========================
-- ORDER TOTALS
-- =========================
CREATE TABLE order_total (
    order_id UUID PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
    subtotal NUMERIC,
    delivery_fee NUMERIC,
    other_fees NUMERIC,
    discount NUMERIC,
    order_amount NUMERIC,
    currency VARCHAR(10)
);

-- =========================
-- PAYMENTS
-- =========================
CREATE TABLE payment_method (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    type VARCHAR(20), -- PENDING / PAID
    method VARCHAR(20), -- CASH / CREDIT / DEBIT
    brand VARCHAR(50),
    value NUMERIC,
    currency VARCHAR(10)
);
CREATE INDEX idx_payment_order ON payment_method(order_id);
CREATE INDEX idx_payment_method ON payment_method(method);

-- =========================
-- ITEMS
-- =========================
CREATE TABLE item (
    id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    external_code TEXT,
    name TEXT,
    unit VARCHAR(20),
    quantity INT,
    unit_price NUMERIC,
    total_price NUMERIC,
    currency VARCHAR(10)
);
CREATE INDEX idx_item_order ON item(order_id);

-- =========================
-- ITEM OPTIONS (MODIFIERS)
-- =========================
CREATE TABLE item_option (
    id UUID PRIMARY KEY,
    item_id UUID REFERENCES item(id) ON DELETE CASCADE,
    external_code TEXT,
    name TEXT,
    unit VARCHAR(20),
    quantity INT,
    unit_price NUMERIC,
    original_price NUMERIC,
    subtotal_price NUMERIC,
    total_price NUMERIC,
    currency VARCHAR(10)
);
CREATE INDEX idx_item_option_item ON item_option(item_id);