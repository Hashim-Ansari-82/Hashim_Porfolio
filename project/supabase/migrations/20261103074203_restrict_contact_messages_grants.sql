/*
# Restrict contact_messages privileges to insert only

Plain-English summary: the contact form table previously inherited default read, edit and delete privileges for website visitors from the database defaults. This migration removes them so visitors can only submit new messages.

1. Modified Tables
- `contact_messages`: privileges for the anonymous and signed-in roles are reset, then INSERT is granted again.

2. Security
- Visitors cannot read, edit, or delete stored messages through the website.
- Row level security and the insert policy are unchanged.

3. Notes
- The site owner still reads messages from the Supabase dashboard, which bypasses these restrictions.
*/

REVOKE ALL ON contact_messages FROM anon, authenticated;
GRANT INSERT ON contact_messages TO anon, authenticated;
