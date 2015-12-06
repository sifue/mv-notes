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

# drop
drop table posts cascade;

# follws test query
insert into posts(note_name, created_at, data) values
 ('test', current_date, '{"name": "test","content": "hello!"}');
select post_id, note_name, created_at, data from posts
where note_name = 'test' order by created_at desc limit 5;
delete from posts where post_id in (select post_id from posts order by post_id desc offset 9999 limit 1);