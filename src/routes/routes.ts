// In your routes file
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  getAllUsers,
  getAllEvents,
  getEvent,
  getEventByUser,
  getUser,
  postAnEvent,
  patchEventHandler,
} from "../controllers/controllers";

import endpoints from "../endpoints";

export function getApiDocumentation(fastify: FastifyInstance) {
  fastify.get("/api", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const api = await reply.code(200).send({ endpoints });
    } catch (error) {
      console.error("Error fetching Api Documentation", error);
      throw error;
    }
  });
}

export function getRoutes(fastify: FastifyInstance) {
  fastify.get("/api/users", getAllUsers);
  fastify.get("/api/events", getAllEvents);
  fastify.get("/api/events/:event_id", getEvent);
  fastify.get("/api/users/:created_by/events", getEventByUser);
  fastify.get("/api/users/:username", getUser);
}

export function patchFlaked(fastify: FastifyInstance) {
  fastify.patch("/api/events/:event_id", patchEventHandler);
}

export function postRoutes(fastify: FastifyInstance) {
  fastify.post("/api/events", postAnEvent);
}
