-- =============================================================
-- CodeStart Academy: Supabase Schema
-- Paste-ready for the new Supabase project
-- URL: https://uaznvlyrrpaypmqkebky.supabase.co
-- =============================================================

create extension if not exists pgcrypto;

do $$
begin
  create type user_role as enum ('admin', 'moderator', 'student', 'parent');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  user_number text unique,
  phone_number text unique,
  avatar_url text,
  score integer not null default 0,
  xp integer not null default 0,
  role user_role not null default 'student',
  is_admin boolean not null default false,
  is_approved boolean not null default false,
  work_duration integer not null default 25,
  break_duration integer not null default 5,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.parent_student_links (
  parent_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (parent_id, student_id)
);

create table if not exists public.levels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level_order integer not null unique,
  image_url text,
  is_published boolean not null default false,
  drip_interval_days integer not null default 7,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lectures (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  description text,
  content_blocks jsonb not null default '[]'::jsonb,
  video_url text,
  pdf_url text,
  slot_number integer not null check (slot_number >= 1 and slot_number <= 100),
  is_live boolean not null default true,
  quiz_required boolean not null default false,
  quiz_data jsonb not null default '[]'::jsonb,
  is_big_exam boolean not null default false,
  drip_days integer not null default 7,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.lectures drop constraint if exists lectures_level_id_slot_number_key;
alter table public.lectures
  add constraint lectures_level_id_slot_number_key
  unique (level_id, slot_number)
  deferrable initially deferred;

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null unique references public.levels(id) on delete cascade,
  title text not null,
  questions jsonb not null default '[]'::jsonb,
  passing_score integer not null default 70,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.student_progress (
  student_id uuid not null references public.profiles(id) on delete cascade,
  lecture_id uuid not null references public.lectures(id) on delete cascade,
  completed_at timestamptz not null default timezone('utc', now()),
  primary key (student_id, lecture_id)
);

create table if not exists public.level_access (
  user_id uuid not null references public.profiles(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete cascade,
  granted_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, level_id)
);

create table if not exists public.spotlight (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  avatar_override_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.student_homework (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  is_completed boolean not null default false,
  due_date timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.moderator_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  moderator_id uuid references public.profiles(id) on delete set null,
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  lecture_id uuid not null references public.lectures(id) on delete cascade,
  attempt_number integer not null default 1,
  is_passed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete cascade,
  score integer not null,
  total_questions integer not null,
  completed_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.exam_responses (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  question_id text not null,
  selected_option integer not null,
  is_correct boolean not null
);

create table if not exists public.exam_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  lecture_id uuid not null references public.lectures(id) on delete cascade,
  answers jsonb not null default '[]'::jsonb,
  mcq_score integer,
  written_score integer,
  total_grade integer,
  moderator_feedback text,
  graded_by uuid references public.profiles(id) on delete set null,
  graded_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.internal_tasks (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete cascade,
  assigned_to_id uuid references public.profiles(id) on delete set null,
  title text not null,
  section text,
  timeline text,
  course_time text,
  description text,
  is_completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.level_chats (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  player_x uuid references public.profiles(id) on delete cascade,
  player_o uuid references public.profiles(id) on delete cascade,
  board jsonb not null default '[null,null,null,null,null,null,null,null,null]'::jsonb,
  current_turn text not null default 'X',
  status text not null default 'pending',
  winner text,
  winner_id uuid references public.profiles(id),
  updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task text not null,
  description text,
  priority text not null default 'medium',
  category text not null default 'Research',
  is_completed boolean not null default false,
  time_limit integer not null default 25,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email = 'aliahmedsabrsabry@gmail.com' then
    insert into public.profiles (
      id,
      username,
      phone_number,
      role,
      is_admin,
      is_approved
    )
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'username', 'alia-admin'),
      new.raw_user_meta_data ->> 'phone_number',
      'admin',
      true,
      true
    )
    on conflict (id) do update set
      role = 'admin',
      is_admin = true,
      is_approved = true;

    return new;
  end if;

  insert into public.profiles (
    id,
    username,
    phone_number,
    role,
    is_admin,
    is_approved
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1), 'student_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data ->> 'phone_number',
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'student'),
    false,
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

update public.profiles
set role = 'admin',
    is_admin = true,
    is_approved = true,
    updated_at = timezone('utc', now())
where id in (
  select id
  from auth.users
  where email = 'aliahmedsabrsabry@gmail.com'
);

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles
    where id = auth.uid() and (role = 'admin' or is_admin = true)
  );
end;
$$;

create or replace function public.is_moderator()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles
    where id = auth.uid() and role in ('admin', 'moderator')
  );
end;
$$;

create or replace function public.is_approved()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles
    where id = auth.uid() and (is_approved = true or role in ('admin', 'moderator'))
  );
end;
$$;

create or replace function public.can_student_access_level(u_id uuid, target_level_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  prev_level_id uuid;
  current_level_order integer;
  lectures_count integer;
  completed_count integer;
  has_manual boolean;
begin
  if exists (
    select 1 from public.level_access
    where user_id = u_id and level_id = target_level_id
  ) then
    return true;
  end if;

  select exists(
    select 1 from public.level_access where user_id = u_id
  ) into has_manual;

  select level_order into current_level_order
  from public.levels
  where id = target_level_id;

  if current_level_order = 1 then
    return not has_manual;
  end if;

  if has_manual then
    return false;
  end if;

  select id into prev_level_id
  from public.levels
  where level_order < current_level_order
  order by level_order desc
  limit 1;

  if prev_level_id is null then
    return true;
  end if;

  select count(*) into lectures_count
  from public.lectures
  where level_id = prev_level_id and is_live is not false;

  select count(*) into completed_count
  from public.student_progress sp
  join public.lectures l on l.id = sp.lecture_id
  where sp.student_id = u_id and l.level_id = prev_level_id;

  return completed_count >= lectures_count;
end;
$$;

create or replace function public.has_level_access(l_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_moderator() then
    return true;
  end if;

  if exists (
    select 1 from public.level_access
    where user_id = auth.uid() and level_id = l_id
  ) then
    return true;
  end if;

  return public.is_approved() and public.can_student_access_level(auth.uid(), l_id);
end;
$$;

create or replace function public.can_access_lecture(p_lecture_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_level_id uuid;
  v_slot_number integer;
  v_drip_interval integer;
  v_granted_at timestamptz;
  v_incomplete_count integer;
begin
  if public.is_moderator() then
    return true;
  end if;

  select level_id, slot_number
  into v_level_id, v_slot_number
  from public.lectures
  where id = p_lecture_id;

  if not public.has_level_access(v_level_id) then
    return false;
  end if;

  select granted_at into v_granted_at
  from public.level_access
  where user_id = auth.uid() and level_id = v_level_id;

  if v_granted_at is null then
    v_granted_at := now();
  end if;

  select coalesce(drip_interval_days, 7)
  into v_drip_interval
  from public.levels
  where id = v_level_id;

  if ((v_slot_number - 1) * v_drip_interval) > extract(day from (now() - v_granted_at)) then
    return false;
  end if;

  if v_slot_number = 1 then
    return true;
  end if;

  select count(*) into v_incomplete_count
  from public.lectures l
  left join public.student_progress sp
    on sp.lecture_id = l.id and sp.student_id = auth.uid()
  where l.level_id = v_level_id
    and l.slot_number < v_slot_number
    and sp.lecture_id is null;

  return v_incomplete_count = 0;
end;
$$;

create or replace function public.complete_lecture_secure(p_lecture_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.can_access_lecture(p_lecture_id) then
    raise exception 'Lecture locked or prerequisites not met.';
  end if;

  insert into public.student_progress (student_id, lecture_id)
  values (auth.uid(), p_lecture_id)
  on conflict (student_id, lecture_id) do nothing;
end;
$$;

alter table public.profiles enable row level security;
alter table public.parent_student_links enable row level security;
alter table public.levels enable row level security;
alter table public.lectures enable row level security;
alter table public.exams enable row level security;
alter table public.student_progress enable row level security;
alter table public.level_access enable row level security;
alter table public.spotlight enable row level security;
alter table public.student_homework enable row level security;
alter table public.moderator_notes enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.exam_responses enable row level security;
alter table public.exam_submissions enable row level security;
alter table public.internal_tasks enable row level security;
alter table public.level_chats enable row level security;
alter table public.direct_messages enable row level security;
alter table public.games enable row level security;
alter table public.todos enable row level security;

drop policy if exists "Public read profiles" on public.profiles;
create policy "Public read profiles" on public.profiles for select using (true);

drop policy if exists "Manage profiles" on public.profiles;
create policy "Manage profiles" on public.profiles for update using (auth.uid() = id or public.is_moderator());

drop policy if exists "Admins full access" on public.profiles;
create policy "Admins full access" on public.profiles for all using (public.is_admin());

drop policy if exists "Moderators manage parent links" on public.parent_student_links;
create policy "Moderators manage parent links" on public.parent_student_links for all using (public.is_moderator());

drop policy if exists "Parents view own links" on public.parent_student_links;
create policy "Parents view own links" on public.parent_student_links for select using (auth.uid() = parent_id or auth.uid() = student_id);

drop policy if exists "View levels" on public.levels;
create policy "View levels" on public.levels for select using (public.is_moderator() or (is_published = true and public.has_level_access(id)));

drop policy if exists "Manage levels" on public.levels;
create policy "Manage levels" on public.levels for all using (public.is_moderator());

drop policy if exists "View lectures" on public.lectures;
create policy "View lectures" on public.lectures for select using (public.is_moderator() or public.can_access_lecture(id));

drop policy if exists "Manage lectures" on public.lectures;
create policy "Manage lectures" on public.lectures for all using (public.is_moderator());

drop policy if exists "View exams" on public.exams;
create policy "View exams" on public.exams for select using (public.is_moderator() or (public.is_approved() and public.has_level_access(level_id)));

drop policy if exists "Manage exams" on public.exams;
create policy "Manage exams" on public.exams for all using (public.is_moderator());

drop policy if exists "Students view own attempts" on public.exam_attempts;
create policy "Students view own attempts" on public.exam_attempts for select using (auth.uid() = student_id);

drop policy if exists "Moderators view all attempts" on public.exam_attempts;
create policy "Moderators view all attempts" on public.exam_attempts for select using (public.is_moderator());

drop policy if exists "Students insert own attempts" on public.exam_attempts;
create policy "Students insert own attempts" on public.exam_attempts for insert with check (auth.uid() = student_id);

drop policy if exists "Students view own responses" on public.exam_responses;
create policy "Students view own responses" on public.exam_responses for select using (
  exists (
    select 1 from public.exam_attempts ea
    where ea.id = attempt_id and ea.student_id = auth.uid()
  )
);

drop policy if exists "Moderators view all responses" on public.exam_responses;
create policy "Moderators view all responses" on public.exam_responses for select using (public.is_moderator());

drop policy if exists "Students insert own responses" on public.exam_responses;
create policy "Students insert own responses" on public.exam_responses for insert with check (
  exists (
    select 1 from public.exam_attempts ea
    where ea.id = attempt_id and ea.student_id = auth.uid()
  )
);

drop policy if exists "Students view own submissions" on public.exam_submissions;
create policy "Students view own submissions" on public.exam_submissions for select using (auth.uid() = student_id);

drop policy if exists "Students insert own submissions" on public.exam_submissions;
create policy "Students insert own submissions" on public.exam_submissions for insert with check (auth.uid() = student_id);

drop policy if exists "Moderators manage submissions" on public.exam_submissions;
create policy "Moderators manage submissions" on public.exam_submissions for all using (public.is_moderator());

drop policy if exists "Parents view child submissions" on public.exam_submissions;
create policy "Parents view child submissions" on public.exam_submissions for select using (
  exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid() and psl.student_id = exam_submissions.student_id
  )
);

drop policy if exists "Moderators view tasks" on public.internal_tasks;
create policy "Moderators view tasks" on public.internal_tasks for select using (public.is_moderator());

drop policy if exists "Admins manage tasks" on public.internal_tasks;
create policy "Admins manage tasks" on public.internal_tasks for all using (public.is_admin());

drop policy if exists "Manage own progress" on public.student_progress;
create policy "Manage own progress" on public.student_progress for select using (
  auth.uid() = student_id
  or public.is_moderator()
  or exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid() and psl.student_id = student_progress.student_id
  )
);

drop policy if exists "Student insert progress" on public.student_progress;
create policy "Student insert progress" on public.student_progress for insert with check (auth.uid() = student_id);

drop policy if exists "View own access" on public.level_access;
create policy "View own access" on public.level_access for select using (
  auth.uid() = user_id
  or public.is_moderator()
  or exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid() and psl.student_id = level_access.user_id
  )
);

drop policy if exists "Manage access" on public.level_access;
create policy "Manage access" on public.level_access for all using (public.is_moderator());

drop policy if exists "Public spotlight view" on public.spotlight;
create policy "Public spotlight view" on public.spotlight for select using (true);

drop policy if exists "Admin manage spotlight" on public.spotlight;
create policy "Admin manage spotlight" on public.spotlight for all using (public.is_moderator());

drop policy if exists "Moderators manage homework" on public.student_homework;
create policy "Moderators manage homework" on public.student_homework for all using (public.is_moderator());

drop policy if exists "Students and parents view homework" on public.student_homework;
create policy "Students and parents view homework" on public.student_homework for select using (
  auth.uid() = student_id
  or exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid() and psl.student_id = student_homework.student_id
  )
  or public.is_moderator()
);

drop policy if exists "Moderators manage notes" on public.moderator_notes;
create policy "Moderators manage notes" on public.moderator_notes for all using (public.is_moderator());

drop policy if exists "Students and parents view notes" on public.moderator_notes;
create policy "Students and parents view notes" on public.moderator_notes for select using (
  auth.uid() = student_id
  or exists (
    select 1 from public.parent_student_links psl
    where psl.parent_id = auth.uid() and psl.student_id = moderator_notes.student_id
  )
  or public.is_moderator()
);

drop policy if exists "Students manage quiz attempts" on public.quiz_attempts;
create policy "Students manage quiz attempts" on public.quiz_attempts for all using (auth.uid() = student_id or public.is_moderator()) with check (auth.uid() = student_id or public.is_moderator());

drop policy if exists "View chat" on public.level_chats;
create policy "View chat" on public.level_chats for select using (true);

drop policy if exists "Post chat" on public.level_chats;
create policy "Post chat" on public.level_chats for insert with check (auth.uid() = sender_id);

drop policy if exists "Moderators delete chat" on public.level_chats;
create policy "Moderators delete chat" on public.level_chats for delete using (public.is_moderator());

drop policy if exists "View messages" on public.direct_messages;
create policy "View messages" on public.direct_messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id or public.is_admin());

drop policy if exists "Send messages" on public.direct_messages;
create policy "Send messages" on public.direct_messages for insert with check (auth.uid() = sender_id);

drop policy if exists "Update messages" on public.direct_messages;
create policy "Update messages" on public.direct_messages for update using (auth.uid() = receiver_id or public.is_admin());

drop policy if exists "View games" on public.games;
create policy "View games" on public.games for select using (true);

drop policy if exists "Manage games" on public.games;
create policy "Manage games" on public.games for all using (auth.uid() = player_x or auth.uid() = player_o or public.is_admin());

drop policy if exists "Manage own todos" on public.todos;
create policy "Manage own todos" on public.todos for all using (auth.uid() = user_id or public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('course_files', 'course_files', true),
  ('videos', 'videos', true),
  ('submissions', 'submissions', true)
on conflict (id) do nothing;

drop policy if exists "Public Read Avatars" on storage.objects;
create policy "Public Read Avatars" on storage.objects for select using (bucket_id = 'avatars');

drop policy if exists "Public Read Course Files" on storage.objects;
create policy "Public Read Course Files" on storage.objects for select using (bucket_id = 'course_files');

drop policy if exists "Public Read Videos" on storage.objects;
create policy "Public Read Videos" on storage.objects for select using (bucket_id = 'videos');

drop policy if exists "Public Read Submissions" on storage.objects;
create policy "Public Read Submissions" on storage.objects for select using (bucket_id = 'submissions');

drop policy if exists "Users upload avatars" on storage.objects;
create policy "Users upload avatars" on storage.objects for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

drop policy if exists "Authenticated upload course_files" on storage.objects;
create policy "Authenticated upload course_files" on storage.objects for insert with check (bucket_id = 'course_files' and auth.role() = 'authenticated');

drop policy if exists "Moderators upload videos" on storage.objects;
create policy "Moderators upload videos" on storage.objects for insert with check (bucket_id = 'videos' and public.is_moderator());

drop policy if exists "Students upload submissions" on storage.objects;
create policy "Students upload submissions" on storage.objects for insert with check (bucket_id = 'submissions' and auth.role() = 'authenticated');

drop policy if exists "Users manage own avatars" on storage.objects;
create policy "Users manage own avatars" on storage.objects for all using (
  bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Users manage own course_files" on storage.objects;
create policy "Users manage own course_files" on storage.objects for all using (
  bucket_id = 'course_files' and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Moderators manage all course_files" on storage.objects;
create policy "Moderators manage all course_files" on storage.objects for all using (
  bucket_id = 'course_files' and public.is_moderator()
);

drop policy if exists "Moderators manage videos" on storage.objects;
create policy "Moderators manage videos" on storage.objects for all using (bucket_id = 'videos' and public.is_moderator());

drop policy if exists "Students manage own submissions" on storage.objects;
create policy "Students manage own submissions" on storage.objects for all using (
  bucket_id = 'submissions' and auth.uid()::text = (storage.foldername(name))[1]
);

do $$
declare
  realtime_table text;
begin
  foreach realtime_table in array array[
    'games',
    'todos',
    'profiles',
    'student_progress',
    'level_chats',
    'direct_messages',
    'internal_tasks',
    'exam_attempts'
  ] loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = realtime_table
    ) then
      execute format('alter publication supabase_realtime add table public.%I', realtime_table);
    end if;
  end loop;
end $$;

create index if not exists idx_lectures_level_id on public.lectures(level_id);
create index if not exists idx_student_progress_student_id on public.student_progress(student_id);
create index if not exists idx_exam_attempts_student_id on public.exam_attempts(student_id);
create index if not exists idx_exam_attempts_level_id on public.exam_attempts(level_id);
create index if not exists idx_exam_responses_attempt_id on public.exam_responses(attempt_id);
create index if not exists idx_level_access_user_id on public.level_access(user_id);
create index if not exists idx_level_chats_level_id on public.level_chats(level_id);
create index if not exists idx_internal_tasks_assigned_to on public.internal_tasks(assigned_to_id);

-- =============================================================
-- Open curriculum seed data
-- Inspired by freeCodeCamp and Coursera-style course structure.
-- Content is rewritten for CodeStart and Egyptian Thanaweya students.
-- =============================================================

do $$
declare
  python_level uuid;
  web_level uuid;
  js_level uuid;
begin
  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values
    ('Python Foundations, freeCodeCamp Style', 1, 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', true, 0)
  on conflict (level_order) do update set
    title = excluded.title,
    image_url = excluded.image_url,
    is_published = true,
    drip_interval_days = 0
  returning id into python_level;

  if python_level is null then
    select id into python_level from public.levels where level_order = 1;
  end if;

  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values
    ('Responsive Web Design, freeCodeCamp Style', 2, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', true, 0)
  on conflict (level_order) do update set
    title = excluded.title,
    image_url = excluded.image_url,
    is_published = true,
    drip_interval_days = 0
  returning id into web_level;

  if web_level is null then
    select id into web_level from public.levels where level_order = 2;
  end if;

  insert into public.levels (title, level_order, image_url, is_published, drip_interval_days)
  values
    ('JavaScript Algorithms and Problem Solving', 3, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80', true, 0)
  on conflict (level_order) do update set
    title = excluded.title,
    image_url = excluded.image_url,
    is_published = true,
    drip_interval_days = 0
  returning id into js_level;

  if js_level is null then
    select id into js_level from public.levels where level_order = 3;
  end if;

  -- The lecture order constraint is deferrable so moderators can reorder content.
  -- PostgreSQL cannot use deferrable constraints with ON CONFLICT, so seeded
  -- curriculum rows are refreshed by deleting the known seed slots first.
  delete from public.lectures
  where (level_id = python_level and slot_number between 1 and 12)
     or (level_id = web_level and slot_number between 1 and 2)
     or (level_id = js_level and slot_number between 1 and 2);

  insert into public.lectures (
    level_id,
    title,
    description,
    slot_number,
    is_live,
    quiz_required,
    content_blocks,
    quiz_data,
    drip_days
  )
  values
    (python_level,'Module 1: Python Setup and First Output','Set up a Python sandbox, run your first script, and understand input/output.',1,true,true,'[{"id":"py-1-a","type":"text","content":"Objective: run Python code in a sandbox and print your first useful output."},{"id":"py-1-b","type":"code","content":"print(\"Welcome to CodeStart Python\")\nname = input(\"Enter your name: \")\nprint(\"Ready to build,\", name)"},{"id":"py-1-c","type":"text","content":"Sandbox task: personalize the message, then print your grade and target faculty on separate lines."},{"id":"py-1-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What does print() do?","options":["Shows output to the user","Stores a variable","Repeats code","Creates a list"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-1-q","text":"Why use input()?","options":["To collect data from the user","To delete output","To style text","To upload files"],"correct":0}]'::jsonb,0),
    (python_level,'Module 2: Variables, Numbers, and Student Scores','Use variables and arithmetic to model grades, totals, and averages.',2,true,true,'[{"id":"py-2-a","type":"text","content":"Objective: store values in variables and calculate totals and averages like a real student score sheet."},{"id":"py-2-b","type":"code","content":"math_score = 85\nphysics_score = 91\nenglish_score = 78\ntotal = math_score + physics_score + english_score\naverage = total / 3\nprint(total)\nprint(average)"},{"id":"py-2-c","type":"text","content":"Sandbox task: add Chemistry and Arabic, then compute a new average."},{"id":"py-2-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What is a variable?","options":["A named place to store data","A type of loop","A browser tool","A PDF file"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-2-q","text":"What does total store?","options":["The sum of all scores","Only one subject","A Boolean","An empty string"],"correct":0}]'::jsonb,0),
    (python_level,'Module 3: Strings and User Input','Work with text, combine messages, and accept student input.',3,true,true,'[{"id":"py-3-a","type":"text","content":"Objective: collect names, goals, and messages using strings and input."},{"id":"py-3-b","type":"code","content":"student_name = input(\"Name: \")\ntrack = input(\"Track: \")\nmessage = \"Hello \" + student_name + \", future \" + track\nprint(message)"},{"id":"py-3-c","type":"text","content":"Sandbox task: build a welcome message for a new CodeStart student with name, grade, and track."},{"id":"py-3-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What does + do with strings?","options":["Joins text together","Creates a loop","Deletes spaces","Stops the program"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-3-q","text":"What type of data is a student name?","options":["String","Integer","Boolean","List"],"correct":0}]'::jsonb,0),
    (python_level,'Module 4: Conditionals and Decision Making','Use if, elif, and else to create logic based on marks and performance.',4,true,true,'[{"id":"py-4-a","type":"text","content":"Objective: make your program decide what to do based on a score or condition."},{"id":"py-4-b","type":"code","content":"average = 87\nif average >= 90:\n    print(\"Excellent\")\nelif average >= 70:\n    print(\"Good, keep going\")\nelse:\n    print(\"Needs revision\")"},{"id":"py-4-c","type":"text","content":"Sandbox task: add one more branch for Pass when the score is between 50 and 69."},{"id":"py-4-d","type":"quiz","content":"","metadata":{"quiz":{"question":"When does elif run?","options":["After if is false and its condition is true","Before if","Always","Only inside loops"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-4-q","text":"Why use else?","options":["To handle the remaining case","To store a score","To upload a file","To build a list"],"correct":0}]'::jsonb,0),
    (python_level,'Module 5: Loops for Study Repetition','Automate repeated study tasks with for and while loops.',5,true,true,'[{"id":"py-5-a","type":"text","content":"Objective: repeat useful actions without rewriting the same code."},{"id":"py-5-b","type":"code","content":"subjects = [\"Math\", \"Physics\", \"English\"]\nfor subject in subjects:\n    print(\"Review\", subject, \"for 30 minutes\")"},{"id":"py-5-c","type":"text","content":"Sandbox task: print a 5-day revision plan with numbered tasks."},{"id":"py-5-d","type":"quiz","content":"","metadata":{"quiz":{"question":"When should you use a loop?","options":["When a task repeats","When writing CSS","When uploading a PDF","Only for graphics"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-5-q","text":"What does for subject in subjects mean?","options":["Take each item from the list one by one","Delete the list","Create a new variable type","Sort the list automatically"],"correct":0}]'::jsonb,0),
    (python_level,'Module 6: Lists and Data Collections','Store multiple values in lists and work with them efficiently.',6,true,true,'[{"id":"py-6-a","type":"text","content":"Objective: collect many related values in one list and analyze them."},{"id":"py-6-b","type":"code","content":"scores = [85, 91, 78, 96]\nprint(scores[0])\nprint(len(scores))\nprint(max(scores))"},{"id":"py-6-c","type":"text","content":"Sandbox task: create a subject list and a score list, then print the highest score."},{"id":"py-6-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What is a list good for?","options":["Storing many related items","Replacing conditions","Rendering video","Creating a database"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-6-q","text":"What does len(scores) return?","options":["Number of items","Highest item","First item","Type of the list"],"correct":0}]'::jsonb,0),
    (python_level,'Module 7: Functions and Reusable Logic','Write reusable functions for common student tools and calculations.',7,true,true,'[{"id":"py-7-a","type":"text","content":"Objective: package logic inside functions so it can be reused and tested."},{"id":"py-7-b","type":"code","content":"def calculate_average(scores):\n    return sum(scores) / len(scores)\n\nprint(calculate_average([85, 91, 78]))"},{"id":"py-7-c","type":"text","content":"Sandbox task: write a function called is_excellent(score) that returns True or False."},{"id":"py-7-d","type":"quiz","content":"","metadata":{"quiz":{"question":"Why use a function?","options":["To reuse logic and keep code cleaner","To slow the program","To remove variables","To replace loops completely"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-7-q","text":"What does return do?","options":["Sends a value back","Prints automatically","Ends the file forever","Creates input"],"correct":0}]'::jsonb,0),
    (python_level,'Module 8: Dictionaries and Structured Student Records','Represent real student data using key-value structures.',8,true,true,'[{"id":"py-8-a","type":"text","content":"Objective: organize related student information with dictionaries."},{"id":"py-8-b","type":"code","content":"student = {\"name\": \"Omar\", \"grade\": 3, \"track\": \"Software Engineering\"}\nprint(student[\"name\"])\nprint(student[\"track\"])"},{"id":"py-8-c","type":"text","content":"Sandbox task: add a weekly_goal field and print a personalized study reminder."},{"id":"py-8-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What does a dictionary store?","options":["Key-value pairs","Only numbers","Only loops","Only lists"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-8-q","text":"How do you get the track value?","options":["student[\"track\"]","student(track)","track.student","student.track()"],"correct":0}]'::jsonb,0),
    (python_level,'Module 9: File Handling and Progress Logs','Save study data and read it back from files.',9,true,true,'[{"id":"py-9-a","type":"text","content":"Objective: write simple progress logs to a file and read them later."},{"id":"py-9-b","type":"code","content":"with open(\"progress.txt\", \"w\") as file:\n    file.write(\"Finished Python Module 1\\n\")\n\nwith open(\"progress.txt\", \"r\") as file:\n    print(file.read())"},{"id":"py-9-c","type":"text","content":"Sandbox task: save today completed study tasks, then print them from the file."},{"id":"py-9-d","type":"quiz","content":"","metadata":{"quiz":{"question":"Why use with open(...)?","options":["To handle files safely","To create a loop","To build a list","To replace variables"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-9-q","text":"What does mode \"w\" mean?","options":["Write to file","Read from file","Loop through file","Delete Python"],"correct":0}]'::jsonb,0),
    (python_level,'Module 10: Error Handling and Debugging','Find bugs, interpret errors, and protect code with try/except.',10,true,true,'[{"id":"py-10-a","type":"text","content":"Objective: understand common Python errors and stop your program from crashing unexpectedly."},{"id":"py-10-b","type":"code","content":"try:\n    score = int(input(\"Enter score: \"))\n    print(score)\nexcept ValueError:\n    print(\"Please enter a valid number\")"},{"id":"py-10-c","type":"text","content":"Sandbox task: protect a division calculator so it handles invalid input and division by zero."},{"id":"py-10-d","type":"quiz","content":"","metadata":{"quiz":{"question":"What is the purpose of except?","options":["Handle an error safely","Repeat code","Create a list","Import a module"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-10-q","text":"Which error appears when text is converted to int incorrectly?","options":["ValueError","SyntaxError","NameError","KeyError"],"correct":0}]'::jsonb,0),
    (python_level,'Module 11: Project Build, Part 1, Student Progress Tracker','Start a real multi-step project with planning, data structure, and basic features.',11,true,true,'[{"id":"py-11-a","type":"text","content":"Project goal: build a Student Progress Tracker that stores a student name, subjects, revision hours, and completed tasks."},{"id":"py-11-b","type":"text","content":"Project steps:\n1. Define the features.\n2. Decide the inputs.\n3. Create variables and lists.\n4. Add functions for totals and progress.\n5. Test each part separately."},{"id":"py-11-c","type":"code","content":"student_name = \"Mariam\"\nsubjects = [\"Math\", \"Physics\", \"English\"]\ncompleted_hours = [2, 1.5, 3]\n\ndef total_hours(hours):\n    return sum(hours)\n\nprint(student_name)\nprint(total_hours(completed_hours))"},{"id":"py-11-d","type":"text","content":"Sandbox task: extend the tracker so it prints one line per subject with its study hours."},{"id":"py-11-e","type":"quiz","content":"","metadata":{"quiz":{"question":"What should you build first in a project?","options":["A small working core","Every advanced feature at once","The final styling only","Nothing until the exam"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-11-q","text":"Why split the project into steps?","options":["To test and understand each part","To make it longer only","To avoid writing code","To remove functions"],"correct":0}]'::jsonb,0),
    (python_level,'Module 12: Project Build, Part 2, Finish and Review the Tracker','Complete the final project with summaries, conditions, and file saving.',12,true,true,'[{"id":"py-12-a","type":"text","content":"Final project target: finish the Student Progress Tracker and make it useful enough for a real Thanaweya student."},{"id":"py-12-b","type":"text","content":"Final project steps:\n1. Calculate total study hours.\n2. Print the strongest and weakest subject.\n3. Show a message if the weekly goal is reached.\n4. Save the result to a text file.\n5. Test with different students."},{"id":"py-12-c","type":"code","content":"weekly_goal = 8\ncompleted_hours = [2, 1.5, 3, 2]\ntotal = sum(completed_hours)\n\nif total >= weekly_goal:\n    print(\"Weekly goal reached\")\nelse:\n    print(\"Keep going\")\n\nwith open(\"student_tracker_report.txt\", \"w\") as file:\n    file.write(f\"Total hours: {total}\\n\")"},{"id":"py-12-d","type":"text","content":"Sandbox task: add subject names and print a complete summary report for one student."},{"id":"py-12-e","type":"quiz","content":"","metadata":{"quiz":{"question":"What makes this a real project instead of a single exercise?","options":["It combines multiple concepts into one useful tool","It uses one print statement only","It has no inputs","It avoids testing"],"correctOptionIndex":0}}}]'::jsonb,'[{"id":"py-12-q","text":"Which feature belongs in the final tracker?","options":["Goal check and saved report","Only one variable","No functions","No file output"],"correct":0}]'::jsonb,0),
    (
      web_level,
      'HTML Structure: Build a Learning Page',
      'A freeCodeCamp-style web lesson focused on semantic HTML and readable page sections.',
      1,
      true,
      true,
      '[
        {"id":"web-1-objective","type":"text","content":"Objective: build a clear HTML page for a course lesson using semantic sections."},
        {"id":"web-1-explain","type":"text","content":"Semantic HTML gives meaning to your content. Use header for the top area, main for the primary content, section for grouped ideas, and footer for supporting links."},
        {"id":"web-1-code","type":"code","content":"<header>\n  <h1>Python Foundations</h1>\n  <p>Learn coding before university.</p>\n</header>\n\n<main>\n  <section>\n    <h2>Today\u2019s Goal</h2>\n    <p>Build a marks calculator.</p>\n  </section>\n</main>"},
        {"id":"web-1-task","type":"text","content":"Challenge: add a second section called Practice Steps with an ordered list of three tasks."},
        {"id":"web-1-quiz","type":"quiz","content":"","metadata":{"quiz":{"question":"Which element should contain the main page content?","options":["main","span","br","meta"],"correctOptionIndex":0}}}
      ]'::jsonb,
      '[{"id":"web-1-q1","text":"Why use semantic HTML?","options":["It makes content structure clearer","It removes all CSS","It disables accessibility","It only works on desktop"],"correct":0}]'::jsonb,
      0
    ),
    (
      web_level,
      'CSS Layout: Responsive Course Card',
      'Students style a course card and make it readable on phone and desktop.',
      2,
      true,
      true,
      '[
        {"id":"web-2-objective","type":"text","content":"Objective: style a course card with spacing, hierarchy, and responsive behavior."},
        {"id":"web-2-code","type":"code","content":".course-card {\n  max-width: 420px;\n  padding: 24px;\n  border-radius: 24px;\n  background: #111827;\n  color: #f8fafc;\n}\n\n.course-card h2 {\n  font-size: 28px;\n  margin-bottom: 12px;\n}"},
        {"id":"web-2-task","type":"text","content":"Challenge: add a button style, then add a media query that reduces padding on small screens."},
        {"id":"web-2-quiz","type":"quiz","content":"","metadata":{"quiz":{"question":"What does max-width help with?","options":["It keeps content readable instead of stretching forever","It changes the HTML tag","It deletes mobile styles","It stores JavaScript values"],"correctOptionIndex":0}}}
      ]'::jsonb,
      '[{"id":"web-2-q1","text":"Why should cards have spacing?","options":["To improve readability and hierarchy","To hide text","To make code invalid","To remove contrast"],"correct":0}]'::jsonb,
      0
    ),
    (
      js_level,
      'JavaScript Functions: Reusable Problem Solving',
      'A practical function lesson adapted from open algorithm practice patterns.',
      1,
      true,
      true,
      '[
        {"id":"js-1-objective","type":"text","content":"Objective: write a function once, then reuse it with different inputs."},
        {"id":"js-1-explain","type":"text","content":"A function is a named set of instructions. In problem solving, functions help you isolate the logic and test it with many examples."},
        {"id":"js-1-code","type":"code","content":"function calculateAverage(scores) {\n  let total = 0;\n\n  for (const score of scores) {\n    total += score;\n  }\n\n  return total / scores.length;\n}\n\nconsole.log(calculateAverage([85, 91, 78]));"},
        {"id":"js-1-task","type":"text","content":"Challenge: write a function called isExcellent that returns true when the average is 90 or above."},
        {"id":"js-1-quiz","type":"quiz","content":"","metadata":{"quiz":{"question":"Why put average logic inside a function?","options":["So it can be reused and tested","So it only works once","So arrays disappear","So the browser refreshes"],"correctOptionIndex":0}}}
      ]'::jsonb,
      '[{"id":"js-1-q1","text":"What does return do?","options":["Sends a value back from the function","Prints every variable","Deletes the function","Creates CSS"],"correct":0}]'::jsonb,
      0
    ),
    (
      js_level,
      'Arrays: Store and Process Lists',
      'Students solve list problems similar to beginner algorithm tracks.',
      2,
      true,
      true,
      '[
        {"id":"js-2-objective","type":"text","content":"Objective: use arrays to store many values and process them with loops."},
        {"id":"js-2-code","type":"code","content":"const scores = [85, 91, 78, 96];\nlet highest = scores[0];\n\nfor (const score of scores) {\n  if (score > highest) {\n    highest = score;\n  }\n}\n\nconsole.log(highest);"},
        {"id":"js-2-task","type":"text","content":"Challenge: change the code to also find the lowest score."},
        {"id":"js-2-quiz","type":"quiz","content":"","metadata":{"quiz":{"question":"What is an array useful for?","options":["Storing multiple related values","Styling text","Uploading videos","Changing database policies"],"correctOptionIndex":0}}}
      ]'::jsonb,
      '[{"id":"js-2-q1","text":"What does scores[0] access?","options":["The first item","The last item","The array length","A CSS class"],"correct":0}]'::jsonb,
      0
    )
  ;
end $$;
