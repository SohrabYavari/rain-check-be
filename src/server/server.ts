import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  getApiDocumentation,
  getRoutes,
  patchFlaked,
  postRoutes,
} from "../routes/routes";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
});

server.register(getApiDocumentation);
server.register(getRoutes);
server.register(patchFlaked);
server.register(postRoutes);

export default server;
