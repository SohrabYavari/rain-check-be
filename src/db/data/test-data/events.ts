import { TEventsData } from "../../../types/TData";

export const events: TEventsData[] = [
  // Events by sam
  {
    event_id: 1,
    event_img_url: "",
    title: "title one",
    description: "event description",
    date: "2025-04-11",
    time: "18:00:00",
    location: "locaiton",
    created_by: "sam",
    invited: "steph",
    host_flaked: false,
    invitee_flaked: false,
  },
  // Events by deedee
  {
    event_id: 2,
    event_img_url: "",
    title: "title two",
    description: "event description",
    date: "2025-05-02",
    time: "20:00:00",
    location: "location",
    created_by: "deedee",
    invited: "lee",
    host_flaked: false,
    invitee_flaked: false,
  },
  // Events by connor
  {
    event_id: 3,
    event_img_url: "",
    title: "title three",
    description: "event description",
    date: "2025-04-20",
    time: "17:30:00",
    location: "location",
    created_by: "connor",
    invited: "sam",
    host_flaked: false,
    invitee_flaked: true,
  },
  // Events by lee
  {
    event_id: 4,
    event_img_url: "",
    title: "title four",
    description: "event description",
    date: "2025-05-01",
    time: "17:00:00",
    location: "location",
    created_by: "lee",
    invited: "connor",
    host_flaked: true,
    invitee_flaked: true,
  }
];
