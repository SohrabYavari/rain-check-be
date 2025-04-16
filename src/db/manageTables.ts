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
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

export async function createEventsTable() {
  return db.query(`
    CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
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
  const values = users.map(
    (_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`
  ).join(", ");

  const flat = users.flatMap(user => [
    user.username,
    user.email,
    user.password,
  ]);

  return db.query(
    `
    INSERT INTO users (username, email, password)
    VALUES ${values}
  `,
    flat
  );
}

export async function seedEvents(events: TEventsData[]) {
  const values = events.map((_, i) => {
    const offset = i * 9;
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9})`;
  }).join(", ");

  const flat = events.flatMap(event => [
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

  return db.query(
    `
    INSERT INTO events (
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
    VALUES ${values}
  `,
    flat
  );
}
