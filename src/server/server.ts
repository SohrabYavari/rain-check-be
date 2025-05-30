import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  deleteRoutes,
  getApiDocumentation,
  getRoutes,
  patchFlaked,
  postRoutes,
} from "../routes/routes";

const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
});

server.register(getApiDocumentation);
server.register(getRoutes);
server.register(patchFlaked);
server.register(postRoutes);
server.register(deleteRoutes);

export default server;
