-- ============================================================
-- ScholarConnect – Supabase Database Schema
-- Run this entire script in your Supabase SQL Editor
-- Project: ScholarConnect Academic Writing Marketplace
-- ============================================================

-- ── 1. PROFILES (extends Supabase auth.users) ──────────────
CREATE TABLE public.profiles (
    id             UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email          TEXT UNIQUE NOT NULL,
    full_name      TEXT NOT NULL,
    user_type      TEXT CHECK (user_type IN ('client', 'writer', 'admin')) NOT NULL,
    is_active      BOOLEAN DEFAULT TRUE,
    is_writer_approved   BOOLEAN DEFAULT FALSE,
    two_factor_enabled   BOOLEAN DEFAULT TRUE,
    consent_given        BOOLEAN DEFAULT FALSE,
    consent_timestamp    TIMESTAMP WITH TIME ZONE,
    last_ip              TEXT,
    login_count          INTEGER DEFAULT 0,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies: users can read own profile; admin can read all
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Service role can do anything"
    ON public.profiles FOR ALL
    USING (auth.role() = 'service_role');

-- ── 2. ORDERS ────────────────────────────────────────────────
CREATE TABLE public.orders (
    id                   SERIAL PRIMARY KEY,
    order_number         TEXT UNIQUE NOT NULL,
    client_id            UUID REFERENCES public.profiles(id) NOT NULL,
    assigned_writer_id   UUID REFERENCES public.profiles(id),
    subject              TEXT NOT NULL,
    sub_level            TEXT DEFAULT 'General',
    academic_level       TEXT NOT NULL,
    page_count           INTEGER NOT NULL CHECK (page_count BETWEEN 1 AND 100),
    deadline             TIMESTAMP WITH TIME ZONE NOT NULL,
    is_urgent            BOOLEAN DEFAULT FALSE,
    price_per_page       DECIMAL(10,2) NOT NULL,
    total_price          DECIMAL(10,2) NOT NULL,
    deposit_amount       DECIMAL(10,2) NOT NULL,
    deposit_paid         BOOLEAN DEFAULT FALSE,
    payment_method       TEXT,
    stripe_session_id    TEXT,
    escrow_id            TEXT,
    instructions         TEXT,
    status               TEXT DEFAULT 'pending_payment' CHECK (
                             status IN ('pending_payment','pending_writer','in_progress',
                                        'under_review','completed','disputed','refunded','cancelled')
                         ),
    revisions_used       INTEGER DEFAULT 0,
    max_revisions        INTEGER DEFAULT 2,
    revision_note        TEXT,
    dispute_reason       TEXT,
    dispute_resolution   TEXT,
    admin_note           TEXT,
    refund_reason        TEXT,
    rating               INTEGER CHECK (rating BETWEEN 1 AND 5),
    review_text          TEXT,
    auto_approve_at      TIMESTAMP WITH TIME ZONE,
    delivered_at         TIMESTAMP WITH TIME ZONE,
    created_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Clients can see their own orders
CREATE POLICY "Clients see own orders"
    ON public.orders FOR SELECT
    USING (client_id = auth.uid());

-- Writers see orders assigned to them or available (pending_writer)
CREATE POLICY "Writers see assigned or available orders"
    ON public.orders FOR SELECT
    USING (
        assigned_writer_id = auth.uid()
        OR (status = 'pending_writer' AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'writer' AND is_writer_approved = TRUE
        ))
    );

-- Admin sees all orders
CREATE POLICY "Admin sees all orders"
    ON public.orders FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Clients can insert orders
CREATE POLICY "Clients can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (client_id = auth.uid() AND EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'client'
    ));

-- Clients and writers can update their own orders (limited)
CREATE POLICY "Service role can update orders"
    ON public.orders FOR UPDATE
    USING (auth.role() = 'service_role');

-- ── 3. DELIVERIES ─────────────────────────────────────────────
CREATE TABLE public.deliveries (
    id               SERIAL PRIMARY KEY,
    order_id         INTEGER REFERENCES public.orders(id) UNIQUE NOT NULL,
    file_url         TEXT,
    file_name        TEXT,
    notes_to_client  TEXT,
    submitted_at     TIMESTAMP WITH TIME ZONE,
    status           TEXT DEFAULT 'not_submitted' CHECK (
                         status IN ('not_submitted','submitted','approved','revision_requested')
                     ),
    plagiarism_score DECIMAL(5,2),
    virus_scan_clean BOOLEAN,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order participants can view deliveries"
    ON public.deliveries FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND (client_id = auth.uid() OR assigned_writer_id = auth.uid())
        )
    );
CREATE POLICY "Service role manages deliveries"
    ON public.deliveries FOR ALL
    USING (auth.role() = 'service_role');

-- ── 4. MESSAGES ──────────────────────────────────────────────
CREATE TABLE public.messages (
    id           SERIAL PRIMARY KEY,
    order_id     INTEGER REFERENCES public.orders(id) NOT NULL,
    sender_id    UUID REFERENCES public.profiles(id) NOT NULL,
    sender_role  TEXT CHECK (sender_role IN ('client','writer')) NOT NULL,
    content      TEXT NOT NULL,
    is_blocked   BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view messages"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND (client_id = auth.uid() OR assigned_writer_id = auth.uid())
        )
    );

CREATE POLICY "Order participants can insert messages"
    ON public.messages FOR INSERT
    WITH CHECK (
        sender_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND (client_id = auth.uid() OR assigned_writer_id = auth.uid())
        )
    );

CREATE POLICY "Admin can view all messages"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- ── 5. ENGLISH TEST QUESTIONS ─────────────────────────────────
CREATE TABLE public.english_test_questions (
    id             SERIAL PRIMARY KEY,
    question_text  TEXT NOT NULL,
    option_a       TEXT NOT NULL,
    option_b       TEXT NOT NULL,
    option_c       TEXT NOT NULL,
    option_d       TEXT NOT NULL,
    correct_answer CHAR(1) CHECK (correct_answer IN ('A','B','C','D')) NOT NULL,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public read for authenticated writers
ALTER TABLE public.english_test_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read test questions"
    ON public.english_test_questions FOR SELECT
    USING (auth.role() = 'authenticated');

-- ── 6. WRITER TEST RESULTS ───────────────────────────────────
CREATE TABLE public.writer_test_results (
    id             SERIAL PRIMARY KEY,
    writer_id      UUID REFERENCES public.profiles(id) NOT NULL,
    test_type      TEXT CHECK (test_type IN ('english','essay')) NOT NULL,
    subject        TEXT,
    sub_level      TEXT,
    score          INTEGER,
    total_questions INTEGER,
    percentage     DECIMAL(5,2),
    passed         BOOLEAN,
    essay_text     TEXT,
    admin_approved BOOLEAN DEFAULT FALSE,
    admin_note     TEXT,
    reviewed_at    TIMESTAMP WITH TIME ZONE,
    completed_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.writer_test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Writers can view own results"
    ON public.writer_test_results FOR SELECT
    USING (writer_id = auth.uid());
CREATE POLICY "Writers can insert own results"
    ON public.writer_test_results FOR INSERT
    WITH CHECK (writer_id = auth.uid());
CREATE POLICY "Admin manages all results"
    ON public.writer_test_results FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- ── 7. FILES ─────────────────────────────────────────────────
CREATE TABLE public.files (
    id           SERIAL PRIMARY KEY,
    order_id     INTEGER REFERENCES public.orders(id),
    uploader_id  UUID REFERENCES public.profiles(id),
    file_url     TEXT NOT NULL,
    file_name    TEXT,
    file_type    TEXT CHECK (file_type IN ('brief','delivery','essay_test','writer_sample')) NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order participants can view files"
    ON public.files FOR SELECT
    USING (
        uploader_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id
            AND (client_id = auth.uid() OR assigned_writer_id = auth.uid())
        )
    );
CREATE POLICY "Authenticated users can upload files"
    ON public.files FOR INSERT
    WITH CHECK (uploader_id = auth.uid());
CREATE POLICY "Admin manages files"
    ON public.files FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

-- ── 8. SECURITY LOGS (blocked contact attempts) ──────────────
CREATE TABLE public.security_logs (
    id               SERIAL PRIMARY KEY,
    user_id          UUID REFERENCES public.profiles(id),
    order_id         INTEGER REFERENCES public.orders(id),
    action           TEXT NOT NULL,   -- 'blocked_message', 'failed_login', etc.
    detail           TEXT,
    blocked_content  TEXT,
    ip_address       TEXT,
    created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin views security logs"
    ON public.security_logs FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );
CREATE POLICY "Service role inserts logs"
    ON public.security_logs FOR INSERT
    WITH CHECK (auth.role() IN ('service_role','authenticated'));

-- ── 9. ESCROW ─────────────────────────────────────────────────
CREATE TABLE public.escrow (
    id             SERIAL PRIMARY KEY,
    order_id       INTEGER REFERENCES public.orders(id) UNIQUE NOT NULL,
    amount         DECIMAL(10,2) NOT NULL,
    payment_method TEXT,
    status         TEXT DEFAULT 'held' CHECK (status IN ('held','released','refunded')),
    stripe_pi_id   TEXT,
    released_at    TIMESTAMP WITH TIME ZONE,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.escrow ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages escrow"
    ON public.escrow FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );
CREATE POLICY "Service role manages escrow"
    ON public.escrow FOR ALL
    USING (auth.role() = 'service_role');

-- ── 10. WITHDRAWALS ───────────────────────────────────────────
CREATE TABLE public.withdrawals (
    id             SERIAL PRIMARY KEY,
    writer_id      UUID REFERENCES public.profiles(id) NOT NULL,
    amount         DECIMAL(10,2) NOT NULL,
    method         TEXT CHECK (method IN ('paypal','mpesa','bank')) NOT NULL,
    account_details TEXT NOT NULL,
    status         TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','paid','rejected')),
    admin_note     TEXT,
    processed_at   TIMESTAMP WITH TIME ZONE,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Writers view own withdrawals"
    ON public.withdrawals FOR SELECT USING (writer_id = auth.uid());
CREATE POLICY "Writers insert own withdrawals"
    ON public.withdrawals FOR INSERT WITH CHECK (writer_id = auth.uid());
CREATE POLICY "Admin manages withdrawals"
    ON public.withdrawals FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

-- ── 11. ORDER_REQUESTS (writer bids) ─────────────────────────
CREATE TABLE public.order_requests (
    id         SERIAL PRIMARY KEY,
    order_id   INTEGER REFERENCES public.orders(id) NOT NULL,
    writer_id  UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(order_id, writer_id)
);

ALTER TABLE public.order_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Writers manage own requests"
    ON public.order_requests FOR ALL USING (writer_id = auth.uid());
CREATE POLICY "Admin manages all requests"
    ON public.order_requests FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

-- ── 12. TWO_FA_CODES (email OTP) ──────────────────────────────
CREATE TABLE public.two_fa_codes (
    id          SERIAL PRIMARY KEY,
    user_id     UUID REFERENCES auth.users(id) NOT NULL,
    code        TEXT NOT NULL,
    used        BOOLEAN DEFAULT FALSE,
    expires_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.two_fa_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages 2FA codes"
    ON public.two_fa_codes FOR ALL
    USING (auth.role() = 'service_role');

-- ── 13. PLATFORM SETTINGS ─────────────────────────────────────
CREATE TABLE public.platform_settings (
    key    TEXT PRIMARY KEY,
    value  TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read settings"
    ON public.platform_settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manages settings"
    ON public.platform_settings FOR ALL
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

-- ── SEED: Platform settings ───────────────────────────────────
INSERT INTO public.platform_settings (key, value) VALUES
    ('standard_rate', '10'),
    ('urgent_rate', '15'),
    ('writer_payout', '4'),
    ('urgent_threshold_days', '5'),
    ('auto_approve_hours', '72'),
    ('max_active_orders', '3'),
    ('paypal_email', 'jameskinyua1997@gmail.com'),
    ('bank_name', 'KCB Bank Kenya'),
    ('bank_account', '1234567890'),
    ('bank_sort', '01-001-001'),
    ('bank_swift', 'KCBLKENX'),
    ('support_email', 'writerhub97@gmail.com'),
    ('whatsapp_number', '254716603371');

-- ── SEED: English test questions (from document) ──────────────
INSERT INTO public.english_test_questions
    (question_text, option_a, option_b, option_c, option_d, correct_answer)
VALUES
    ('The committee _____ to postpone the decision until the next meeting.',
     'have decided','are deciding','has decided','were deciding','C'),
    ('Choose the word most similar in meaning to concise:',
     'brief','lengthy','detailed','wordy','A'),
    ('Which sentence is grammatically correct?',
     'Each of the students are responsible.','Each of the students is responsible.',
     'Every student are responsible.','Every student have responsibility.','B'),
    ('The final draft of your thesis must be _____ to the graduate office by Friday.',
     'submitted','submitting','submit','submits','A'),
    ('Choose the synonym for abundant:',
     'scarce','plentiful','rare','insufficient','B'),
    ('Identify the sentence with correct parallel structure.',
     'She likes hiking, to swim, and running.','She likes hiking, swimming, and to run.',
     'She likes to hike, swim, and run.','She likes to hike, swimming, and runs.','C'),
    ('Choose the correct preposition: "She is very adept _____ handling difficult situations."',
     'for','in','at','on','C'),
    ('The professor was _____ that the students would fail the exam if they didn''t study.',
     'adamant','lenient','ambiguous','indifferent','A'),
    ('Identify the error: "The team are currently reviewing the data from the latest experiment."',
     'The team','are currently reviewing','the data','latest experiment','B'),
    ('Choose the word most nearly opposite in meaning to cryptic:',
     'obscure','clear','mysterious','confusing','B'),
    ('Which of these is a correct transition for comparing two ideas?',
     'However','Nevertheless','Similarly','Conversely','C'),
    ('The research was extensive; _____, the results were inconclusive.',
     'consequently','furthermore','moreover','however','D'),
    ('Choose the correctly spelled word:',
     'occured','occurred','ocured','ocurred','B'),
    ('In academic writing, which of the following is considered inappropriate?',
     'using personal anecdotes','citing peer-reviewed sources',
     'maintaining an objective tone','providing logical arguments','A'),
    ('Which sentence uses the colon correctly?',
     'The report covered several key areas: marketing, finance, and operations.',
     'The report covered: marketing, finance, and operations.',
     'The report: covered several key areas marketing, finance, and operations.',
     'The report covered several key areas marketing, finance, and operations:','A'),
    ('Which of the following is an example of a primary source?',
     'a history textbook','a biography','a diary from a Holocaust survivor','an encyclopedia article','C'),
    ('Choose the correct word: "The study''s findings are _____ with previous research."',
     'consistent','constant','persistent','insistent','A'),
    ('What is the best way to avoid plagiarism?',
     'paraphrasing the source','citing the source','using quotation marks','All of the above','D'),
    ('Choose the correct sentence.',
     'The author wrote the book, and it was published in 2020.',
     'The author wrote the book, which was published in 2020.',
     'The author wrote the book, was published in 2020.',
     'Having written the book, was published in 2020.','B'),
    ('What does "et al." mean?',
     '"and others"','"for example"','"that is"','"in the same place"','A'),
    ('Identify the correct passive voice: "The company will launch the new product next month."',
     'The new product will launch by the company.',
     'The new product will be launched next month.',
     'The new product is launching next month.',
     'The new product launched.','B'),
    ('The term "anomaly" most nearly means:',
     'a standard procedure','an expected outcome','an irregularity or deviation','a common event','C'),
    ('Choose the sentence that is a run-on.',
     'He finished his essay, so he went to bed.',
     'He finished his essay he went to bed.',
     'Because he finished his essay, he went to bed.',
     'For he finished his essay, he went to bed.','B'),
    ('Which of these is an appropriate source for a university-level paper?',
     'Wikipedia','a personal blog','a popular magazine','a peer-reviewed academic journal','D'),
    ('The abstract of a research paper should:',
     'include all data tables','be written first','summarize the entire study',
     'introduce new ideas not in the paper','C');

-- ── SEED: Essay prompts ───────────────────────────────────────
CREATE TABLE public.essay_prompts (
    id          SERIAL PRIMARY KEY,
    subject     TEXT UNIQUE NOT NULL,
    title       TEXT NOT NULL,
    prompt      TEXT NOT NULL,
    format      TEXT NOT NULL,
    requirements JSONB,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.essay_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read essay prompts"
    ON public.essay_prompts FOR SELECT USING (auth.role() = 'authenticated');

INSERT INTO public.essay_prompts (subject, title, prompt, format, requirements) VALUES
('Business & Management',
 'Digital Transformation in Industry',
 'Analyse how a specific industry (e.g., retail, technology, or manufacturing) has been transformed by digital innovation over the past decade. Use real-world examples to evaluate the strategic advantages and challenges of this transformation.',
 'APA 7th Edition',
 '["Minimum 1,250 words (~5 pages)","APA 7th edition formatting","At least 5 peer-reviewed sources (last 10 years)","Include in-text citations","Reference list at end","Abstract required","Times New Roman 12pt, double-spaced, 1-inch margins"]'),
('Nursing & Medicine',
 'Ethical Dilemmas in Modern Healthcare',
 'Discuss one critical ethical dilemma in modern healthcare, such as resource allocation during a pandemic, end-of-life care decisions, or patient data privacy. Argue for a specific course of action, referencing relevant ethical principles and standards.',
 'APA 7th Edition',
 '["Minimum 1,250 words","APA 7th edition","At least 5 peer-reviewed clinical sources","Discuss ethical principles","Patient-centered approach","Double-spaced, Times New Roman 12pt"]'),
('Computer Science & IT',
 'Software Development Methodologies',
 'Compare and contrast two different software development methodologies (e.g., Agile, Waterfall, DevOps). Analyse the specific types of projects for which each methodology is best suited, justifying your conclusions with technical reasons.',
 'IEEE or ACM',
 '["Minimum 1,250 words","IEEE or ACM citation format","At least 5 technical sources","Include technical comparison","Real-world project examples","Arial 10pt or Times New Roman 12pt"]'),
('Psychology',
 'Attachment Theory and Adult Relationships',
 'Evaluate the extent to which early childhood attachment styles predict adult relationship patterns. Critically assess the empirical evidence for this link, considering both supporting studies and methodological limitations.',
 'APA 7th Edition',
 '["Minimum 1,250 words","APA 7th edition","Minimum 5 peer-reviewed psychology journals","Critical analysis required","Abstract required","Double-spaced"]'),
('Law',
 'Burden of Proof in Criminal Trials',
 'Explain the legal concept of "burden of proof" in a criminal trial. Using a specific landmark case as an example, analyse how this principle is applied and why it is fundamental to a system of justice.',
 'OSCOLA or Bluebook',
 '["Minimum 1,250 words","OSCOLA or Bluebook citation","Reference primary sources (cases, statutes)","Apply IRAC methodology","Discuss precedent and legal reasoning"]'),
('Engineering',
 'Engineering Project Lifecycle Analysis',
 'Select a modern engineering project (e.g., a bridge, a renewable energy system, or a new material). Analyse the lifecycle of this project, identifying the key engineering challenges at each stage and how they were resolved.',
 'IEEE or ASME',
 '["Minimum 1,250 words","IEEE or ASME citation format","At least 5 technical engineering sources","Include lifecycle analysis","Discuss safety and standards (ISO, ANSI)"]');

-- ── HELPER FUNCTIONS ──────────────────────────────────────────

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Generate unique order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := 'ORD-';
    i INTEGER;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Auto-create profile when user signs up (trigger on auth.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, user_type, consent_given, consent_timestamp)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'client'),
        (NEW.raw_user_meta_data->>'consent_given')::boolean,
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Check and auto-approve orders after 72h
CREATE OR REPLACE FUNCTION auto_approve_orders()
RETURNS void AS $$
BEGIN
    UPDATE public.orders
    SET status = 'completed',
        updated_at = NOW()
    WHERE status = 'under_review'
      AND auto_approve_at IS NOT NULL
      AND auto_approve_at <= NOW();

    -- Release escrow for auto-approved orders
    UPDATE public.escrow
    SET status = 'released',
        released_at = NOW()
    WHERE order_id IN (
        SELECT id FROM public.orders
        WHERE status = 'completed'
    ) AND status = 'held';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── REALTIME: Enable for messages ─────────────────────────────
-- Run these in Supabase dashboard under Database > Replication
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- ── STORAGE BUCKETS (run in Supabase Storage) ─────────────────
-- Create these buckets in your Supabase Storage dashboard:
-- 1. 'order-briefs'     (private) - client uploaded assignment briefs
-- 2. 'deliverables'    (private) - writer submitted work
-- 3. 'essay-uploads'   (private) - writer essay submissions
-- 4. 'writer-samples'  (private) - writer portfolio samples

-- ── CREATE ADMIN USER ─────────────────────────────────────────
-- IMPORTANT: After running this schema, do the following in Supabase:
-- 1. Go to Authentication > Users > Invite User
-- 2. Enter solutionscenter29@gmail.com
-- 3. After they sign up, run:
--    UPDATE public.profiles SET user_type = 'admin' WHERE email = 'solutionscenter29@gmail.com';
--    UPDATE public.profiles SET is_active = TRUE WHERE email = 'solutionscenter29@gmail.com';

SELECT 'Schema created successfully! Tables: profiles, orders, deliveries, messages, english_test_questions, writer_test_results, files, security_logs, escrow, withdrawals, order_requests, two_fa_codes, platform_settings, essay_prompts' AS status;
