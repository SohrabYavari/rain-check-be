import request from "supertest";
import server from "../server/server";
import seed from "../db/seed";
import db from "../server/connection";
import { testData } from "../db/data/test-data";

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

  it("should give an object of a dingle user", async () => {
    const {
      body: { user },
    } = await request(server.server).get("/api/users/sam").expect(200);
    expect(user).toMatchObject([
      { email: "sam@raincheckltd.com", password: "password", username: "sam" },
    ]);
  });
});
