import { FastifyReply, FastifyRequest } from "fastify";
import {
  fetchUsers,
  fetchEvents,
  fetchEventByUser,
  fetchEventById,
  fetchUser,
  inviteeFlaked,
  hostFlaked,
  addEvent,
  inviteFriend,
} from "../models/models";
import { TEventsData, TUsersData, PatchActions } from "../types/TData";

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
export async function getAllEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const events = await fetchEvents();

    if (!events) {
      return reply.status(404).send({ message: "No events found" });
    }

    return reply.send({ events });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

//! Get SINGLE user and event endpoint
export async function getEvent(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const { event_id } = request.params;
    const event = await fetchEventById(event_id);

    if (!event) {
      return reply.status(404).send({ message: "No event found" });
    }

    return reply.status(200).send({ event });
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

//! PATCH requests, marking the flakers and inviting friends
export async function markInviteeFlaked(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const { event_id } = request.params;
    const flaker = await inviteeFlaked(event_id);
    return reply.code(201).send({ success: true, data: flaker });
  } catch (error) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
export async function markHostFlaked(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const { event_id } = request.params;
    const flaker = await hostFlaked(event_id);
    return reply.code(201).send({ success: true, data: flaker });
  } catch (error) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
export async function setInvitedFriend(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const { event_id } = request.params;
    const { invited } = request.body as { invited: string };

    const event = await inviteFriend(invited, event_id);
    return reply.code(201).send({ event });
  } catch (error) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
export async function patchEventHandler(
  request: FastifyRequest<{
    Params: TEventsData;
    Querystring: { action: string };
  }>,
  reply: FastifyReply
) {
  const { action } = request.query;

  try {
    switch (action) {
      case PatchActions.InviteeFlaked:
        return await markInviteeFlaked(request, reply);

      case PatchActions.HostFlaked:
        return await markHostFlaked(request, reply);

      case PatchActions.InviteFriend:
        return await setInvitedFriend(request, reply);

      default:
        return reply.status(400).send({ message: "Invalid action type" });
    }
  } catch (error) {
    console.error("Error in patchEventHandler:", error);
    return reply.status(500).send({ message: "Unexpected error" });
  }
}


//!POST a new event to certain user
export async function postAnEvent(
  request: FastifyRequest<{ Body: TEventsData }>,
  reply: FastifyReply
) {
  try {
    const {
      title,
      description,
      date,
      location,
      created_by,
      invited,
      host_flaked,
      invitee_flaked,
    } = request.body;

    const event = await addEvent(
      title,
      description,
      date,
      location,
      created_by,
      invited,
      host_flaked,
      invitee_flaked
    );
    return reply.code(201).send({ event });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
