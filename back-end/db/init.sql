create table if not exists public.tasks
(
    id         integer generated always as identity
        constraint tasks_pk
            primary key,
    title      varchar,
    notes      text,
    date       date,
    time       time,
    context_id integer,
    priority   integer,
    status     varchar,
    category   varchar
);

comment on column public.tasks.category is 'category';

alter table public.tasks
    owner to kayisrahman;

create table if not exists public.contexts
(
    id      integer generated always as identity
        constraint contexts_pk
            primary key,
    context varchar not null
        constraint contexts_pk_2
            unique
);

alter table public.contexts
    owner to kayisrahman;

create table if not exists public.priorities
(
    id       integer generated always as identity
        constraint priorities_pk
            primary key,
    priority varchar
        constraint priorities_pk_2
            unique
);

alter table public.priorities
    owner to kayisrahman;

