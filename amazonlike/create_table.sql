create table products(
    id int auto_increment primary key,
    title varchar(255) not null,
    price double not null,
    description text not null, 
    imageurl varchar(255) not null
)
