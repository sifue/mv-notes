create table posts (
post_id serial primary key,
note_name varchar(200),
created_at timestamp with time zone,
data text
);
create index posts_note_name_created_at on posts (
  note_name,
  created_at
);
