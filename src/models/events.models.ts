const eventsConnection = require("../server/connection").default;

export async function fetchEvents() {
  try {
    const { rows } = await eventsConnection.query("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

//! Fetch single user and event from eventsConnection
export async function fetchEventById(event_id: number) {
  const { rows } = await eventsConnection.query(
    "SELECT * FROM events WHERE event_id = $1",
    [event_id]
  );

  return rows;
}

//! Updating the flakers on the eventsConnection
export async function inviteeFlaked(event_id: number) {
  try {
    const { rows } = await eventsConnection.query(
      "UPDATE events SET invitee_flaked = true WHERE event_id = $1 RETURNING *",
      [event_id]
    );
    return rows;
  } catch (error) {
    console.error("Error patching event details:", error);
    throw error;
  }
}
export async function hostFlaked(event_id: number) {
  try {
    const { rows } = await eventsConnection.query(
      "UPDATE events SET host_flaked = true WHERE event_id = $1 RETURNING *",
      [event_id]
    );
    return rows;
  } catch (error) {
    console.error("Error patching event details:", error);
    throw error;
  }
}
export async function inviteFriend(username: string, event_id: number) {
  try {
    const { rows } = await eventsConnection.query(
      "UPDATE events SET invited = $1 WHERE event_id = $2 RETURNING *",
      [username, event_id]
    );
    return rows;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

//! Adds new event object to the eventsConnection
export async function addEvent(
  title: string,
  event_img_url: string | null,
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
        event_img_url,
        description, 
        date, 
        time,
        location, 
        created_by, 
        invited,
        host_flaked,
        invitee_flaked
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const { rows } = await eventsConnection.query(insertQuery, [
      title,
      event_img_url,
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

//! DELETE post
export async function removeEvent(event_id: number) {
  try {
    const { rows } = await eventsConnection.query(
      `DELETE FROM events WHERE event_id = $1`,
      [event_id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error deleting event", error);
    throw error;
  }
}
