-- TailorApply database schema (run in Supabase SQL editor)

create table profiles (
  id uuid references auth.users primary key,
  email text,
  plan text default 'free' check (plan in ('free','pro','coach')),
  credits int default 2,
  credits_reset_at timestamptz default now() + interval '30 days',
  stripe_customer_id text,
  payment_issue boolean default false,
  created_at timestamptz default now()
);

create table generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  match_score int,
  created_at timestamptz default now()
);

-- Auto-create a profile row whenever someone signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Atomic credit consumption: Pro/Coach users bypass the counter entirely.
-- This prevents a race condition where two fast requests both pass a naive "credits > 0" check.
create function consume_credit(p_user_id uuid)
returns boolean as $$
declare
  v_plan text;
  v_credits int;
begin
  select plan, credits into v_plan, v_credits from profiles where id = p_user_id for update;

  if v_plan in ('pro','coach') then
    return true;
  end if;

  if v_credits > 0 then
    update profiles set credits = credits - 1 where id = p_user_id;
    return true;
  end if;

  return false;
end;
$$ language plpgsql security definer;

create function refund_credit(p_user_id uuid)
returns void as $$
begin
  update profiles set credits = credits + 1
  where id = p_user_id and plan = 'free';
end;
$$ language plpgsql security definer;

-- Row Level Security: users can only ever read their own row
alter table profiles enable row level security;
create policy "Users read own profile" on profiles for select using (auth.uid() = id);

alter table generations enable row level security;
create policy "Users read own generations" on generations for select using (auth.uid() = user_id);

-- Monthly credit reset — schedule this with Supabase's built-in pg_cron (free tier includes it)
select cron.schedule(
  'reset-free-credits',
  '0 0 * * *', -- daily check, only resets rows whose reset date has passed
  $$ update profiles set credits = 2, credits_reset_at = now() + interval '30 days'
     where plan = 'free' and credits_reset_at < now(); $$
);
