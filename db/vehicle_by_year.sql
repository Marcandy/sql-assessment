select * from vehicles
join users on users.id = vehicles.ownerId
where vehicles.year > 2000
order by vehicles.year desc
