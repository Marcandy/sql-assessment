-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS users;

create table Users (id serial PRIMARY KEY, firstname text, lastname text, email text);

insert into Users (firstname, lastname, email)
  VALUES
( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');
