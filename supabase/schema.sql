create table if not exists users (
  id uuid primary key,
  email text unique not null,
  name text not null,
  hash text not null,
  salt text not null,
  role text not null default 'user',
  blocked boolean not null default false,
  created_at timestamptz not null default now()
);
-- Включаем защиту строк без политик: доступ только у сервера через service_role ключ.
alter table users enable row level security;
