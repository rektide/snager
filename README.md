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

```
CREATE TYPE event_type AS ENUM ('pitch', 'browse', 'catch');
CREATE TABLE events(id, type event_type, foreign_id);
CREATE TABLE pitches(id, user_id, start_loc, stop_loc, start_time);
CREATE TABLE browses(id, user_id, pitch_id); // is this necessary?
CREATE TABLE catches(id, user_id, pitch_id);
CREATE TABLE users(???);
CREATE TABLE locations(???);
```

# PostgreSQL

## postgresql.conf

`listen_addresses='*'` for external access

## pg_hba.conf

```
host    ridedb_test     all             0.0.0.0/0               md5
host    ridedb          all             0.0.0.0/0               md5
```

For external addresses to those databases.


## Db initialization

`sudo -u postgres psql` gets in. Use scripts in `schema.sql` file to init.
