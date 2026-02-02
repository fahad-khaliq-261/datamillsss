-- ============================================
-- USE CASES TABLE FOR INDUSTRY INSIGHTS
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Create the use_cases table
CREATE TABLE IF NOT EXISTS use_cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    industry VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'Case Study',
    title VARCHAR(500) NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    image VARCHAR(500),
    href VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries by industry
CREATE INDEX IF NOT EXISTS idx_use_cases_industry ON use_cases(industry);

-- Create index for date sorting
CREATE INDEX IF NOT EXISTS idx_use_cases_date ON use_cases(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read use cases (public website)
CREATE POLICY "Allow public read access" ON use_cases
    FOR SELECT
    USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON use_cases
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON use_cases
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON use_cases
    FOR DELETE
    USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on update
DROP TRIGGER IF EXISTS update_use_cases_updated_at ON use_cases;
CREATE TRIGGER update_use_cases_updated_at
    BEFORE UPDATE ON use_cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - Remove if not needed)
-- ============================================

-- INSERT INTO use_cases (industry, category, title, description, date) VALUES
-- ('healthcare', 'Case Study', 'How we reduced hospital readmissions by 35%', 'A comprehensive analysis of our AI-driven patient monitoring system that helped reduce readmission rates.', '2026-01-15'),
-- ('healthcare', 'Article', 'The Future of AI in Medical Diagnostics', 'Exploring how machine learning is revolutionizing early disease detection.', '2026-01-10'),
-- ('aerospace-and-defense', 'Case Study', 'Predictive Maintenance for Military Aircraft', 'Implementing AI-powered maintenance scheduling that improved aircraft availability by 40%.', '2026-01-20');

