create database bamazon;
use bamazon;
create table products
(
item_id integer not null,
product_name varchar(150) not null,
department_name varchar(150)not null,
price decimal(10,4) not null,
stock_quantity integer(100)not null
);
