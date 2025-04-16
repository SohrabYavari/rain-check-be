// In your routes file
import { FastifyInstance } from "fastify";
import {
  getAllUsers,
  getAllEvents,
  getEvent,
  getEventByUser,
  getUser,
  postAnEvent,
  patchEventHandler,
} from "../controllers/controllers";

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
