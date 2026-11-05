/*
# Create contact_messages table

Plain-English summary: stores messages sent through the contact form on the portfolio website so they can be read later by the site owner.

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, required, 1 to 100 characters)
  - `email` (text, required, 3 to 254 characters, must contain "@")
  - `subject` (text, required, 1 to 150 characters)
  - `message` (text, required, 1 to 2000 characters)
  - `created_at` (timestamp, set automatically)

2. Security
- Row level security is enabled on `contact_messages`.
- Visitors (the anonymous role used by the website) can only INSERT a new message. They cannot read, edit or delete messages.
- Only INSERT is granted, so the website never reads back stored messages.
- The site owner reads messages from the Supabase dashboard, which bypasses these restrictions.

3. Notes
- Length and format limits are enforced by the database itself, so oversized or malformed submissions are rejected even if the browser check is bypassed.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND position('@' in email) > 0),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
