-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR KHEL SETHU
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/mbaaissbqqemmeibiodz/editor
-- =====================================================

-- DROP EXISTING TABLES IF THEY EXIST (CLEAN START)
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. CREATE EVENTS TABLE
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(500) NOT NULL,
    "time" VARCHAR(100) NOT NULL,
    mode VARCHAR(100) NOT NULL,
    datestart DATE NOT NULL,
    dateend DATE NOT NULL,
    venue VARCHAR(255) NOT NULL,
    eventcategory VARCHAR(100) NOT NULL,
    registerationfee VARCHAR(100) NOT NULL,
    cashprice NUMERIC NOT NULL,
    contact VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREATE USERS TABLE (for registration/login)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CREATE EVENT_REGISTRATIONS TABLE (for user event registrations)
CREATE TABLE event_registrations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phnumber BIGINT NOT NULL,
    year VARCHAR(50) NOT NULL,
    event VARCHAR(255) NOT NULL,
    amount NUMERIC NOT NULL,
    transactionid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(eventcategory);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON event_registrations(email);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE POLICIES FOR PUBLIC ACCESS
-- =====================================================
-- Note: These are permissive policies for development
-- You should implement proper authentication for production

-- Events table policies (public read, authenticated insert/update/delete)
CREATE POLICY "Enable read access for all users" ON events
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON events
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON events
    FOR DELETE USING (true);

-- Users table policies
CREATE POLICY "Enable read access for all users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON users
    FOR UPDATE USING (true);

-- Event registrations table policies
CREATE POLICY "Enable read access for all users" ON event_registrations
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON event_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON event_registrations
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON event_registrations
    FOR DELETE USING (true);

-- =====================================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================

-- Insert a sample event (uncomment to use)
-- INSERT INTO events (name, description, photo, "time", mode, datestart, dateend, venue, eventcategory, registerationfee, cashprice, contact)
-- VALUES 
-- ('Cricket Tournament', 'Inter-college cricket championship', 'https://example.com/cricket.jpg', '10:00 AM', 'Offline', '2025-11-01', '2025-11-03', 'College Ground', 'Cricket', '500', 5000, '9876543210');

-- =====================================================
-- END OF SCHEMA
-- =====================================================
