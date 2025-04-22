import format from "pg-format";
import db from "../server/connection";
import { TEventsData, TUsersData } from "../types/TData";

export async function dropTables() {
  await db.query(`DROP TABLE IF EXISTS events`);
  await db.query(`DROP TABLE IF EXISTS users`);
}

export async function createUsersTable() {
  return db.query(`
    CREATE TABLE users (
      username TEXT PRIMARY KEY,
      avatar_img_url TEXT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

export async function createEventsTable() {
  return db.query(`
    CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      event_img_url TEXT,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      date DATE NOT NULL,
      time TIME,
      location TEXT NOT NULL,
      created_by TEXT NOT NULL,
      invited TEXT,
      host_flaked BOOLEAN DEFAULT false,
      invitee_flaked BOOLEAN DEFAULT false,
      FOREIGN KEY (created_by) REFERENCES users(username),
      FOREIGN KEY (invited) REFERENCES users(username)
    );
  `);
}

export async function seedUsers(users: TUsersData[]) {
  const usersFormatted = users.map((user) => [
    user.username,
    user.avatar_img_url,
    user.email,
    user.password,
  ]);

  const query = format(
    `
    INSERT INTO users (
      username, 
      avatar_img_url,
      email, 
      password
    )
    VALUES %L
  `,
    usersFormatted
  );

  return db.query(query);
}

export async function seedEvents(events: TEventsData[]) {
  const eventsFormatted = events.map((event) => [
    event.event_img_url,
    event.title,
    event.description,
    event.date,
    event.time,
    event.location,
    event.created_by,
    event.invited,
    event.host_flaked,
    event.invitee_flaked,
  ]);

  const query = format(
    `
    INSERT INTO events (
      event_img_url,
      title,
      description,
      date,
      time,
      location,
      created_by,
      invited,
      host_flaked,
      invitee_flaked
    )
    VALUES %L
  `,
    eventsFormatted
  );

  return db.query(query);
}
