import db from "../server/connection";

//! Fetch users and events from DB
export async function fetchUsers() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
export async function fetchEvents() {
  try {
    const [rows] = await db.query("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

//! Fetch single user and event from DB
export async function fetchEventById(event_id: number) {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE event_id = ?", [
      event_id,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
export async function fetchEventByUser(created_by: string) {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE created_by = ?", [
      created_by,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching users events");
    throw error;
  }
}
export async function fetchUser(username: string) {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching users events");
    throw error;
  }
}

//! Updating the flakers on the DB
export async function inviteeFlaked(event_id: number) {
  try {
    await db.query(`UPDATE events SET invitee_flaked = 1 WHERE event_id = ?`, [
      event_id,
    ]);
    const flaked = await db.query(`SELECT * FROM events WHERE event_id = ?`, [
      event_id,
    ]);
    return flaked;
  } catch (error) {
    console.error("Error patching event details", error);
    throw error;
  }
}

export async function hostFlaked(event_id: number) {
  try {
    await db.query(`UPDATE events SET host_flaked = 1 WHERE event_id = ?`, [
      event_id,
    ]);
    const flaked = await db.query(`SELECT * FROM events WHERE event_id = ?`, [
      event_id,
    ]);
    return flaked;
  } catch (error) {
    console.error("Error patching event details");
    throw error;
  }
}
