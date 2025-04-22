import request from "supertest";
import server from "../server/server";
import seed from "../db/seed";
import db from "../server/connection";
import { testData } from "../db/data/test-data/index";

beforeAll(async () => {
  await seed(testData);
  await server.listen({ port: 9000 });
});

afterAll(async () => {
  await db.end();
  await server.close();
});

describe("testing /api/users endpoint", () => {
  it("should respond with the correct data type for each variable", async () => {
    const {
      body: { users },
    } = await request(server.server).get("/api/users").expect(200);
    users.forEach((user: any) => {
      expect(typeof user.username).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.password).toBe("string");
    });
  });

  it("should give an object of a single user", async () => {
    const {
      body: { user },
    } = await request(server.server).get("/api/users/sam").expect(200);
    expect(user).toMatchObject([
      { email: "sam@email.com", password: "password", username: "sam" },
    ]);
  });

  it("should respond with an array of objects containing the events a user has planned", async () => {
    const {
      body: { events_by_user },
    } = await request(server.server)
      .get("/api/users/connor/events")
      .expect(200);

    expect(events_by_user).toMatchObject([
      {
        created_by: "connor",
        date: "2025-04-19T23:00:00.000Z",
        description: "event description",
        event_id: 3,
        event_img_url: "",
        host_flaked: false,
        invited: "sam",
        invitee_flaked: true,
        location: "location",
        time: "17:30:00",
        title: "title three",
      },
      {
        created_by: "lee",
        date: "2025-04-30T23:00:00.000Z",
        description: "event description",
        event_id: 4,
        event_img_url: "",
        host_flaked: true,
        invited: "connor",
        invitee_flaked: true,
        location: "location",
        time: "17:00:00",
        title: "title four",
      },
    ]);
  });
});
