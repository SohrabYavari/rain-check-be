// In your routes file
import { FastifyInstance } from "fastify";
import {
  getAllUsers,
  getAllEvents,
  getEvent,
  getEventByUser,
  getUser,
  markInviteeFlaked,
  markHostFlaked,
} from "../controllers/controllers";

export function getRoutes(fastify: FastifyInstance) {
  fastify.get("/api/users", getAllUsers);
  fastify.get("/api/events", getAllEvents);
  fastify.get("/api/events/:event_id", getEvent);
  fastify.get("/api/users/:created_by/events", getEventByUser);
  fastify.get("/api/users/:username", getUser);
}

export function patchInviteeFlaked(fastify: FastifyInstance) {
  fastify.patch("/api/events/:event_id", markInviteeFlaked);
}
export function patchHostFlaked(fastify: FastifyInstance) {
  fastify.patch("/api/events/:event_id", markHostFlaked);
}
