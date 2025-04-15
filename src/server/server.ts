import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  getRoutes,
  patchFlaked,
} from "../routes/routes";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
});

server.register(getRoutes);
server.register(patchFlaked);
// server.register(patchHostFlaked);

export default server;
