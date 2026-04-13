-- Supabase Storage Setup for Quote Images
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Create the storage bucket for quote images (private by default)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-images',
  'quote-images',
  false,  -- Private bucket (not publicly accessible)
  5242880,  -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies for quote-images bucket
-- Note: Service role key bypasses RLS, so these policies are for client-side access if needed

-- Allow authenticated users to upload (not used currently since we use service role)
-- CREATE POLICY "Allow authenticated uploads"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'quote-images' AND auth.role() = 'authenticated');

-- Allow service role full access (default behavior)
-- No explicit policy needed since service role bypasses RLS

-- Verify bucket was created
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'quote-images';
