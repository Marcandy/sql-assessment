update vehicles
set ownerId = null
where ownerId = $1 AND id = $2
