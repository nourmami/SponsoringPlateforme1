to connect postgres to docker container

# Create a docker container
sudo docker run -d --name userDB -p 5432:5432 -e POSTGRES_PASSWORD=sponso postgres

# Connect to the container
 docker ps
 docker exec -it 1bba4eb52b69b bash

# Connect to the database
psql -U postgres

# Create a database
CREATE DATABASE userDB;

# change password for postgres user
\password postgres

