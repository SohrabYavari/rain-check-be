import { FastifyReply, FastifyRequest } from "fastify";
import {
  fetchEvents,
  fetchEventById,
  inviteeFlaked,
  hostFlaked,
  addEvent,
  inviteFriend,
  removeEvent,
} from "../models/events.models";
import { TEventsData, PatchActions } from "../types/TData";

export async function getAllEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const events = await fetchEvents();

    if (!events.length) {
      return reply.status(404).send({ message: "No events found" });
    }

    return reply.send({ events });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getEvent(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  try {
    const event = await fetchEventById(event_id);

    if (!event.length) {
      return reply.status(404).send({ message: "No event found" });
    }

    return reply.status(200).send({ event });
  } catch (err) {
    if (typeof event_id !== "number") {
      return reply
        .status(400)
        .send({ message: "Bad Request, parameter must be a number" });
    } else {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}

//! PATCH requests, marking the flakers and inviting friends
export async function markInviteeFlaked(
  request: FastifyRequest<{ Params: { event_id: number } }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  try {
    const flaker = await inviteeFlaked(event_id);
    return reply.code(201).send({ success: true, data: flaker });
  } catch (err) {
    if (typeof event_id !== "number") {
      return reply
        .status(400)
        .send({ message: "Bad Request, parameter must be a number" });
    } else {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}
export async function markHostFlaked(
  request: FastifyRequest<{ Params: { event_id: number } }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  try {
    const flaker = await hostFlaked(event_id);
    return reply.code(201).send({ success: true, data: flaker });
  } catch (err) {
    if (typeof event_id !== "number") {
      return reply
        .status(400)
        .send({ message: "Bad Request, parameter must be a number" });
    } else {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}
export async function setInvitedFriend(
  request: FastifyRequest<{ Params: { event_id: number } }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  const { invited } = request.body as { invited: string };
  try {
    const event = await inviteFriend(invited, event_id);
    return reply.code(201).send({ event });
  } catch (error) {
    if (typeof event_id !== "number" || typeof invited !== "string") {
      return reply.status(400).send({ message: "Bad Request" });
    } else {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}

//? cannot have multiple controllers on the same endpoint
//? one event handler that switches between which controller is being used depending on the query action applied:
export async function patchEventHandler(
  request: FastifyRequest<{
    Params: { event_id: number };
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

//! POST a new event
export async function postAnEvent(
  request: FastifyRequest<{ Body: TEventsData }>,
  reply: FastifyReply
) {
  const {
    title,
    event_img_url,
    description,
    date,
    time,
    location,
    created_by,
    invited,
    host_flaked,
    invitee_flaked,
  } = request.body;
  try {
    const event = await addEvent(
      title,
      event_img_url,
      description,
      date,
      time,
      location,
      created_by,
      invited,
      host_flaked,
      invitee_flaked
    );
    return reply.code(201).send({ event });
  } catch (err) {
    if (!title || !description || !date || !location || !created_by) {
      return reply.status(400).send({ message: "Bad Request" });
    } else {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}

//! DELETE event
export async function deleteEvent(
  request: FastifyRequest<{ Params: { event_id: number } }>,
  reply: FastifyReply
) {
  try {
    const { event_id } = request.params;
    await removeEvent(event_id);
    reply.code(204);
  } catch (error) {
    console.error("Delete event failed:", error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
