create table posts (
post_id serial primary key,
note_name varchar(200),
created_at date,
data text
);
create index posts_note_name_created_at on posts (
  note_name,
  created_at
);

# follws test query
insert into posts(note_name, created_at, data) values
 ('test', current_date, '{"name": "test","content": "hello!"}');
select post_id, note_name, created_at, data from posts
where note_name = 'test' order by created_at desc limit 5;