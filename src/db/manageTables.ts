import db from "../server/connection";
import { TEventsData, TUsersData } from "../types/TData";

export async function dropTables() {
  await db.query(`DROP TABLE IF EXISTS events`);
  await db.query(`DROP TABLE IF EXISTS users`);
}
export async function createUsersTable() {
  return db.query(`
    CREATE TABLE users (
      username VARCHAR(255) NOT NULL PRIMARY KEY,
      email VARCHAR(500) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
}

export async function createEventsTable() {
  return db.query(`
    CREATE TABLE events (
      event_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      date DATETIME NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_by VARCHAR(255) NOT NULL,
      invited VARCHAR(255),
      host_flaked TINYINT DEFAULT 0,
      invitee_flaked TINYINT DEFAULT 0,
      FOREIGN KEY (created_by) REFERENCES users(username),
      FOREIGN KEY (invited) REFERENCES users(username)
    );
  `);
}

export async function seedUsers(users: TUsersData[]) {
  const usersMapped = users.map((user) => [
    user.username,
    user.email,
    user.password,
  ]);
  return db.query(
    `
    INSERT INTO users (username, email, password) 
    VALUES ?
  `,
    [usersMapped]
  );
}

export async function seedEvents(events: TEventsData[]) {
  const eventsMapped = events.map((event) => [
    event.title,
    event.description,
    event.date,
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
    location, 
    created_by, 
    invited, 
    host_flaked, 
    invitee_flaked
    )
    VALUES ?
  `,
    [eventsMapped]
  );
}