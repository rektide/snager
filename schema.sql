CREATE USER ridemaster WITH PASSWORD 'h00plaf00';
CREATE TABLESPACE ridetablespace OWNER ridemaster LOCATION '/srv/db-ridesnag';
CREATE DATABASE ridedb OWNER ridemaster TABLESPACE ridetablespace;
CREATE DATABASE ridedb_test OWNER ridemaster TABLESPACE ridetablespace;

\c ridedb_test;
-- or
-- \c ridedb

CREATE EXTENSION hstore;
CREATE TABLE IF NOT EXISTS "user" (id serial primary key, name text, pass text, username text, created_at timestamp, updated_at timestamp, e hstore);
CREATE TYPE trip_state AS ENUM ('wanting', 'offering', 'fulfilled');
CREATE TABLE IF NOT EXISTS trip (id serial primary key, state trip_state, owner int, fulfiller int, a int, b int, seats int, created_at timestamp, updated_at timestamp, e hstore);
CREATE TABLE IF NOT EXISTS meet (id serial primary key, text text, lat double precision, lng double precision, created_at timestamp, updated_at timestamp, e hstore);
CREATE TABLE IF NOT EXISTS rating (id serial primary key, rater int, ratee int, general double precision, created_at timestamp, updated_at timestamp, e hstore);

-- \c ridedb_test
CREATE USER rideapp_test WITH PASSWORD 'password5352';
GRANT ALL PRIVILEGES ON DATABASE ridedb_test TO rideapp_test;
GRANT ALL PRIVILEGES ON TABLE "user" TO rideapp_test;
GRANT ALL PRIVILEGES ON TABLE trip TO rideapp_test;
GRANT ALL PRIVILEGES ON TABLE meet TO rideapp_test;
GRANT ALL PRIVILEGES ON TABLE rating TO rideapp_test;
GRANT ALL PRIVILEGES ON TABLE "user" TO rideapp_test;

INSERT INTO "user" (name, pass, username) VALUES ('Matt Fowle', 'mfff', 'mfowle');

-- or
-- \c ridedb
--CREATE USER rideapp WITH PASSWORD 'h00plaf00';
--GRANT ALL PRIVILEGES ON DATABASE ridedb TO rideapp;
