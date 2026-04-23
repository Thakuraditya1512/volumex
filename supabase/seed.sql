-- Seed data for SkillBridge Supabase schema with valid UUIDs
-- Tables: profiles, roadmaps, courses, assessments, platform_stats

-- 1. Insert Profiles (Users)
-- Generated fixed UUIDs for consistent testing
INSERT INTO public.profiles (id, full_name, email, role, status, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Arjun Sharma', 'arjun@example.com', 'student', 'active', '2024-01-15 00:00:00+00', NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Priya Reddy', 'priya@example.com', 'admin', 'active', '2024-02-20 00:00:00+00', NOW()),
  ('00000000-0000-0000-0000-000000000003', 'Rahul Verma', 'rahul@example.com', 'student', 'pending', '2024-03-10 00:00:00+00', NOW()),
  ('00000000-0000-0000-0000-000000000004', 'Sneha Patel', 'sneha@example.com', 'employee', 'active', '2024-03-25 00:00:00+00', NOW()),
  ('00000000-0000-0000-0000-000000000005', 'Kiran Das', 'kiran@example.com', 'student', 'suspended', '2024-04-01 00:00:00+00', NOW())
ON CONFLICT (id) DO UPDATE 
SET full_name = EXCLUDED.full_name, email = EXCLUDED.email, role = EXCLUDED.role, status = EXCLUDED.status;

-- 2. Insert Platform Stats (Historical Data)
INSERT INTO public.platform_stats (date, total_users, active_users, new_users, total_students, total_employees, total_admins)
VALUES 
  ('2024-05-08', 2100, 1890, 320, 1200, 800, 100),
  ('2024-05-09', 2900, 2500, 410, 1600, 1100, 200),
  ('2024-05-10', 3200, 2800, 380, 1800, 1250, 150),
  ('2024-05-11', 3800, 3300, 520, 2100, 1500, 200),
  ('2024-05-12', 4200, 3600, 490, 2400, 1600, 200),
  ('2024-05-13', 3700, 3200, 440, 2100, 1400, 200),
  ('2024-05-14', 3200, 2700, 350, 1800, 1200, 200)
ON CONFLICT DO NOTHING;

-- 3. Insert Roadmaps
INSERT INTO public.roadmaps (id, title, description, steps, created_by, is_published, enrolled_count)
VALUES 
  (gen_random_uuid(), 'Full Stack Developer', 'Master both frontend and backend technologies.', '[]', '00000000-0000-0000-0000-000000000002', true, 1234),
  (gen_random_uuid(), 'Data Scientist', 'Learn data analysis, machine learning, and visualization.', '[]', '00000000-0000-0000-0000-000000000002', true, 842),
  (gen_random_uuid(), 'Backend Developer', 'Focus on server-side logic, databases, and APIs.', '[]', '00000000-0000-0000-0000-000000000002', true, 623),
  (gen_random_uuid(), 'DevOps Engineer', 'Automate infrastructure and deployment pipelines.', '[]', '00000000-0000-0000-0000-000000000002', true, 512),
  (gen_random_uuid(), 'Mobile App Developer', 'Build native and cross-platform mobile applications.', '[]', '00000000-0000-0000-0000-000000000002', true, 412)
ON CONFLICT DO NOTHING;
