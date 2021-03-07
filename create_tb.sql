create table tb_users (
  id int auto_increment primary key,
  user_name varchar(20) not null,
  password varchar(20) not null
);

create table tb_blogs (
  id int auto_increment primary key,
  author_id int,
  title varchar(50) not null,
  create_time datetime not null,
  content mediumtext,
  deleted tinyint default 0,
  foreign key (author_id) references tb_users (id)
);

insert into tb_users
  (user_name, password)
  values ('YZJ', '123');
insert into tb_users
  (user_name, password)
  values ('Joey', '123');

insert into tb_blogs
  (author_id, title, create_time, content)
  values (1, '爱的教育', '20200307050505', '<p>abc</p>');
insert into tb_blogs
  (author_id, title, create_time, content)
  values (2, '恨的教育', '20200307050505', '<p>abc</p>');
