import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
});

export default server;
