import { FastifyReply, FastifyRequest } from "fastify";
import {
  fetchUsers,
  fetchEventByUser,
  fetchUser,
} from "../models/users.models";
import { TEventsData, TUsersData } from "../types/TData";

//! Get All users and events endpoints
export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await fetchUsers();

    if (!users) {
      return reply.status(404).send({ message: "No users found" });
    }

    return reply.send({ users });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
export async function getEventByUser(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const { created_by } = request.params;
    const events_by_user = await fetchEventByUser(created_by);

    if (!events_by_user) {
      return reply
        .status(404)
        .send({ message: "This User has no events planned" });
    }

    return reply.send({ events_by_user });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
export async function getUser(
  request: FastifyRequest<{ Params: TUsersData }>,
  reply: FastifyReply
) {
  try {
    const { username } = request.params;
    const user = await fetchUser(username);

    if (!user) {
      return reply.status(404).send({ message: "This User does not exist" });
    }

    return reply.send({ user });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
