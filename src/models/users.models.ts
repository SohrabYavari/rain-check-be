const usersConnection = require("../server/connection").default;

//! Fetch users and events from usersConnection
export async function fetchUsers() {
  try {
    const { rows } = await usersConnection.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
export async function fetchEventByUser(created_by: string) {
  try {
    const {rows} = await usersConnection.query(
      "SELECT * FROM events WHERE created_by = $1 OR invited = $1",
      [created_by]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching user's events:", error);
    throw error;
  }
}
export async function fetchUser(username: string) {
  try {
    const { rows } = await usersConnection.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return rows;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
