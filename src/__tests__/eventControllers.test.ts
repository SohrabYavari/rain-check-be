import request from "supertest";
import server from "../server/server";
import seed from "../db/seed";
import db from "../server/connection";
import { testData } from "../db/data/test-data/index";
import { TEventsData } from "../types/TData";

beforeAll(async () => {
  await seed(testData);
  await server.listen({ port: 9000 });
});

afterAll(async () => {
  await db.end();
  await server.close();
});

describe("GET /api/events", () => {
  it("should respond with an array of event objects ", async () => {
    const {
      body: { events },
    } = await request(server.server).get("/api/events").expect(200);
    events.forEach((event: TEventsData) => {
      expect(typeof event.event_id).toBe("number");
      expect(typeof event.title).toBe("string");
      expect(typeof event.description).toBe("string");
      expect(typeof event.date).toBe("string");
      expect(typeof event.time).toBe("string");
      expect(typeof event.location).toBe("string");
      expect(typeof event.created_by).toBe("string");
      expect(typeof event.invited).toBe("string");
      expect(typeof event.host_flaked).toBe("boolean");
      expect(typeof event.invitee_flaked).toBe("boolean");
    });
  });
});

describe("GET /api/events/:event_id", () => {
  it("should responds with a single event object with the corresponding event_id ", async () => {
    const {
      body: { event },
    } = await request(server.server).get("/api/events/1").expect(200);

    expect(event[0]).toEqual({
      event_id: 1,
      event_img_url: null,
      title: "title one",
      description: "event description",
      date: "2025-04-10T23:00:00.000Z",
      time: "18:00:00",
      location: "locaiton",
      created_by: "sam",
      invited: "steph",
      host_flaked: false,
      invitee_flaked: false,
    });
  });

  it("should respond with a 400 when given incorrect paramater", async () => {
    const { body } = await request(server.server)
      .get("/api/events/one")
      .expect(400);
    expect(body.message).toBe("Bad Request, parameter must be a number");
  });

  it("should  respond with 404 error status if a valid event_id is input but doesn't exist in the database", async () => {
    const { body } = await request(server.server)
      .get("/api/events/70")
      .expect(404);
    expect(body.message).toBe("No event found");
  });
});

describe("PATCH /api/event/:event_id", () => {
  describe("inviteFriend", () => {
    it("should respond with a single event object with the updated invitee property", async () => {
      const {
        body: { event },
      } = await request(server.server)
        .patch("/api/events/4?action=inviteFriend")
        .send({ invited: "connor" })
        .expect(201);
      expect(event[0]).toMatchObject({
        event_id: 4,
        title: "title four",
        description: "event description",
        date: "2025-04-30T23:00:00.000Z",
        time: "17:00:00",
        location: "location",
        created_by: "lee",
        invited: "connor",
        host_flaked: true,
        invitee_flaked: true,
      });
    });
    it("should respond with a 400 error when given the wrong action query string", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/4?action=invitemyfriends")
        .send({ invited: "connor" })
        .expect(400);

      expect(body.message).toBe("Invalid action type");
    });
    it("should respond with a 400 error when given incorrect event_id", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/four?action=inviteFriend")
        .send({ invited: "connor" })
        .expect(400);

      expect(body.message).toBe("Bad Request");
    });
  });

  describe("hostFlaked", () => {
    it("should respond with a single event object with the up", async () => {
      const {
        body: { data },
      } = await request(server.server)
        .patch("/api/events/3?action=hostFlaked")
        .send({ host_flaked: true })
        .expect(201);
      expect(data[0]).toMatchObject({
        event_id: 3,
        title: "title three",
        description: "event description",
        date: "2025-04-19T23:00:00.000Z",
        time: "17:30:00",
        location: "location",
        created_by: "connor",
        invited: "sam",
        host_flaked: true,
        invitee_flaked: true,
      });
    });
    it("should respond with a 400 error when given the wrong action query string", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/3?action=flakeyHost")
        .send({ host_flaked: false })
        .expect(400);

      expect(body.message).toBe("Invalid action type");
    });
    it("should respond with a 400 error when given incorrect event_id", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/three?action=hostFlaked")
        .send({ host_flaked: false })
        .expect(400);

      expect(body.message).toBe("Bad Request, parameter must be a number");
    });
  });

  describe("inviteeFlaked", () => {
    it("should respond with a single event object with the updated inviteeFlaked prop", async () => {
      const {
        body: { data },
      } = await request(server.server)
        .patch("/api/events/2?action=inviteeFlaked")
        .send({ invitee_flaked: true })
        .expect(201);
      expect(data[0]).toMatchObject({
        event_id: 2,
        title: "title two",
        description: "event description",
        date: "2025-05-01T23:00:00.000Z",
        time: "20:00:00",
        location: "location",
        created_by: "deedee",
        invited: "lee",
        host_flaked: false,
        invitee_flaked: true,
      });
    });
    it("should respond with a 400 error when given the wrong action query string", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/2?action=flakeyfriend")
        .send({ invitee_flaked: false })
        .expect(400);

      expect(body.message).toBe("Invalid action type");
    });
    it("should respond with a 400 error when given incorrect event_id", async () => {
      const { body } = await request(server.server)
        .patch("/api/events/two?action=inviteeFlaked")
        .send({ invitee_flaked: false })
        .expect(400);

      expect(body.message).toBe("Bad Request, parameter must be a number");
    });
  });
});

describe("POST /api/events", () => {
  it("should responds with a single event object with the corresponding event_id ", async () => {
    const {
      body: { event },
    } = await request(server.server)
      .post("/api/events")
      .send({
        title: "title five",
        description: "event description!",
        date: "2025-06-14",
        time: "16:00:00",
        location: "London",
        created_by: "deedee",
        invited: null,
        host_flaked: false,
        invitee_flaked: false,
      })
      .expect(201);
    expect(event).toMatchObject({
      event_id: 5,
      title: "title five",
      event_img_url: null,
      description: "event description!",
      date: "2025-06-13T23:00:00.000Z",
      time: "16:00:00",
      location: "London",
      created_by: "deedee",
      invited: null,
      host_flaked: false,
      invitee_flaked: false,
    });
  });
  it("should respond with a 400 : Bad Request error status if an invalid body is sent", async () => {
    const {
      body: { message },
    } = await request(server.server)
      .post("/api/events")
      .send({
        title: "title six",
        description: "event description!",
        date: "2025-06-16 16:00:00",
        location: "Bristol",
      })
      .expect(400);
    expect(message).toBe("Bad Request");
  });
});
