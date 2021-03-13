create table user (
  id int auto_increment primary key,
  username varchar(20) not null,
  password varchar(20) not null
);

create table article (
  id int auto_increment primary key,
  author_id int,
  title varchar(50) not null,
  create_time datetime not null,
  content mediumtext,
  deleted tinyint default 0,
  foreign key (author_id) references user (id)
);

insert into user
  (username, password)
  values ('YZJ', '123');
insert into user
  (username, password)
  values ('Joey', '123');

insert into article
  (author_id, title, create_time, content)
  values (1, '爱的教育', '20200307050505', '<p>abc</p>');
insert into article
  (author_id, title, create_time, content)
  values (2, '恨的教育', '20200307050505', '<p>abc</p>');
