import request from "supertest";
import server from "../server/server";
import seed from "../db/seed";
import db from "../server/connection";
import { testData } from "../db/data/test-data";

beforeAll(async () => {
	await seed(testData);
	await server.listen({ port: 3000 });
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
		events.forEach((event: any) => {
			expect(typeof event.event_id).toBe("number");
			expect(typeof event.title).toBe("string");
			expect(typeof event.description).toBe("string");
			expect(typeof event.date).toBe("string");
			expect(typeof event.location).toBe("string");
			expect(typeof event.created_by).toBe("string");
			expect(typeof event.invited).toBe("string");
			expect(typeof event.host_flaked).toBe("number");
			expect(typeof event.invitee_flaked).toBe("number");
		});
	});
});

describe("GET /api/events/:event_id", () => {
	it("should responds with a single event object with the corresponding event_id ", async () => {
		const {
			body: { event },
		} = await request(server.server).get("/api/events/1").expect(200);
		expect(event).toMatchObject([
			{
				event_id: 1,
				title: "title one",
				description: "event description",
				date: "2025-04-11T17:00:00.000Z",
				location: "locaiton",
				created_by: "sam",
				invited: "steph",
				host_flaked: 0,
				invitee_flaked: 0,
			},
		]);
	});
	test.todo("400 : Responds with Bad Request error status if an invalid event_id is input");
	test.todo(
		"404 : Responds with Not Found error status if an valid event_id is input but doesn't exist in the database"
	);
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
				date: "2025-06-16 16:00:00",
				location: "London",
				created_by: "deedee",
				invited: null,
				host_flaked: 0,
				invitee_flaked: 0,
			})
			.expect(201);
		expect(event).toMatchObject(
			{
				event_id: 5,
				title: "title five",
				description: "event description!",
				date: "2025-06-16T15:00:00.000Z",
				location: "London",
				created_by: "deedee",
				invited: null,
				host_flaked: 0,
				invitee_flaked: 0,
			},
		);
	});

    it('should respond with a Bad Request error status if an invalid body is sent', async () => {
        const {
			body: { message },
		} = await request(server.server)
			.post("/api/events")
			.send({
				title: "title six",
				description: "event description!",
				date: "2025-06-16 16:00:00",
				location: "London",
				created_by: "deedee",
			})
			.expect(404)
            expect(message).toBe("Bad Request"); 
    });

});
