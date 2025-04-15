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

describe("testing /api/users endpoint", () => {
  it("should give an object of multiple users", () => {
    return request(server.server)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((user: any) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(typeof user.password).toBe("string");
        });
      });
  });
});
