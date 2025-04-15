import Fastify from "fastify";
import cors from "@fastify/cors";
import { getRoutes, patchHostFlaked, patchInviteeFlaked } from "../routes/routes";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
});

server.register(getRoutes);
server.register(patchInviteeFlaked)
server.register(patchHostFlaked)

export default server;
