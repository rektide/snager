# Ridesnap

Imagine something that might take place at a party.
1. Alex(driver) to Chris(host): Yeah, I can take you to Falmouth tomorrow, I'm going that way.
2. Chris(host) to Jordan(hitcher): I'm getting a ride from A to Falmouth tomorrow
3. Jordan(hitcher) to Alex(driver): Hey, I overheard have an errand in Falmouth; do you have room for me too?

Now we split the conversation inserting a computer in between:

Alex(driver) to Ridesnag: I might drive someone from (A) to (B) (tomorrow).
Ridesnag to Jordan(hitcher): (A) is driving from (A) to (B) (tomorrow).
Jordan(hitcher) to Ridesnag: I'd like to get that ride.

In structuring the database, we might first consider a simple log of everything that happens.
Then we would have a table of events, which have an event type (one of the three things above).

CREATE TYPE event_type AS ENUM ('pitch', 'browse', 'catch');
CREATE TABLE events(id, type event_type, foreign_id);
CREATE TABLE pitches(id, user_id, start_loc, stop_loc, start_time);
CREATE TABLE browses(id, user_id, pitch_id); // is this necessary?
CREATE TABLE catches(id, user_id, pitch_id);
CREATE TABLE users(???);
CREATE TABLE locations(???);



# Schema Creation

sudo -u postgres psql
CREATE USER ridemaster WITH PASSWORD 'h00plaf00';
CREATE TABLESPACE ridetablespace OWNER ridemaster LOCATION '/srv/db-ridesnag';
CREATE DATABASE ridedb OWNER ridemaster TABLESPACE ridetablespace;
\c ridedb
CREATE TABLE "user" (id int primary key, name text);
CREATE TABLE trip (id int primary key, owner int);

CREATE USER rideapp WITH PASSWORD 'h00plaf00';
GRANT ALL PRIVILEGES ON DATABASE ridedb TO rideapp;
