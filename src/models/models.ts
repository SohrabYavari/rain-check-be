import db from "../server/connection";

//! Fetch users and events from DB
export async function fetchUsers() {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchEvents() {
  try {
    const { rows } = await db.query("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

//! Fetch single user and event from DB
export async function fetchEventById(event_id: number) {
  try {
    const { rows } = await db.query("SELECT * FROM events WHERE event_id = $1", [event_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

export async function fetchEventByUser(created_by: string) {
  try {
    const { rows } = await db.query("SELECT * FROM events WHERE created_by = $1", [created_by]);
    return rows;
  } catch (error) {
    console.error("Error fetching user's events:", error);
    throw error;
  }
}

export async function fetchUser(username: string) {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

//! Updating the flakers on the DB
export async function inviteeFlaked(event_id: number) {
  try {
    await db.query("UPDATE events SET invitee_flaked = true WHERE event_id = $1", [event_id]);
    const { rows } = await db.query("SELECT * FROM events WHERE event_id = $1", [event_id]);
    return rows;
  } catch (error) {
    console.error("Error patching event details:", error);
    throw error;
  }
}

export async function hostFlaked(event_id: number) {
  try {
    await db.query("UPDATE events SET host_flaked = true WHERE event_id = $1", [event_id]);
    const { rows } = await db.query("SELECT * FROM events WHERE event_id = $1", [event_id]);
    return rows;
  } catch (error) {
    console.error("Error patching event details:", error);
    throw error;
  }
}

export async function inviteFriend(username: string, event_id: number) {
  try {
    await db.query("UPDATE events SET invited = $1 WHERE event_id = $2", [username, event_id]);
    const { rows } = await db.query("SELECT * FROM events WHERE event_id = $1", [event_id]);
    return rows;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

//! Adds new event object to the DB
export async function addEvent(
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  created_by: string,
  invited: string,
  host_flaked: boolean,
  invitee_flaked: boolean
) {
  try {
    const insertQuery = `
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const { rows } = await db.query(insertQuery, [
      title,
      description,
      date,
      time,
      location,
      created_by,
      invited,
      host_flaked,
      invitee_flaked,
    ]);

    return rows[0];
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
