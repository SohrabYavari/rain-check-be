import { TEventsData } from "../../../types/TData";

export const events: TEventsData[] = [
  // Events by sam
  {
    event_id: 1,
    title: "title one",
    description: "event description",
    date: "2025-04-11 18:00:00",
    location: "locaiton",
    created_by: "sam",
    invited: "steph",
    host_flaked: 0,
    invitee_flaked: 0,
  },
  // Events by deedee
  {
    event_id: 2,
    title: "title two",
    description: "event description",
    date: "2025-05-02 20:00:00",
    location: "location",
    created_by: "deedee",
    invited: "lee",
    host_flaked: 0,
    invitee_flaked: 0,
  },
  // Events by connor
  {
    event_id: 3,
    title: "title three",
    description: "event description",
    date: "2025-04-20 17:30:00",
    location: "location",
    created_by: "connor",
    invited: "sam",
    host_flaked: 0,
    invitee_flaked: 1,
  },

  // Events by lee
  {
    event_id: 4,
    title: "title four",
    description: "event description",
    date: "2025-05-01 17:00:00",
    location: "location",
    created_by: "lee",
    invited: "connor",
    host_flaked: 1,
    invitee_flaked: 1,
  },

  // Events by steph
  {
    event_id: 5,
    title: "title five",
    description: "event description",
    date: "2025-05-10 14:00:00",
    location: "event descriptionlocation",
    created_by: "steph",
    invited: "deedee",
    host_flaked: 1,
    invitee_flaked: 0,
  },
];