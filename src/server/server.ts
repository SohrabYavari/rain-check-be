import Fastify from "fastify";
import cors from "@fastify/cors";
import { getRoutes } from "../routes/routes";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
});

server.register(getRoutes);

export default server;
