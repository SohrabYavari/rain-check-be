interface Endpoint {
  description: string;
  queries?: string[];
  "example-body"?: object;
  "example-response": object;
}

const endpoints: { [key: string]: Endpoint } = {
  "GET /api/users": {
    description: "serves an array of all users",
    "example-response": {
      users: [
        {
          user_id: 1,
          username: "sam",
          email: "sam@legitemail.com",
          password: "verySecurePassword",
        },
      ],
    },
  },
  "GET /api/events": {
    description: "serves an array of all events",
    "example-response": {
      events: [
        {
          event_id: 1,
          title: "Northcoders Graduation",
          description: "drinks and snacks",
          date: "2025-04-11T18:00:00.000Z",
          time: "18:00:00",
          location: "Manchester",
          created_by: "connor",
          invited: "deedee",
          host_flaked: false,
          invitee_flaked: false,
        },
        {
          event_id: 2,
          title: "Northcoders Afters",
          description: "drinks and more drinks",
          date: "2025-04-11T18:00:00.000Z",
          time: "18:00:00",
          location: "Manchester",
          created_by: "connor",
          invited: "deedee",
          host_flaked: false,
          invitee_flaked: false,
        },
      ],
    },
  },
  "GET /api/events/:eventId": {
    description: "serves a single event object",
    "example-response": {
      event: {
        event_id: 3,
        title: "Minecraft LAN party",
        description: "blocks and doritos",
        date: "2025-04-11T18:00:00.000Z",
        time: "20:00:00",
        location: "Your house",
        created_by: "steph",
        invited: "lee",
        host_flaked: false,
        invitee_flaked: false,
      },
    },
  },
  "GET /api/users/:created_by/events": {
    description: "serves an array of all events created by a user",
    "example-response": {
      events_by_user: {
        events_created: [
          {
            event_id: 4,
            title: "small gig",
            description: "music and vibes",
            date: "2025-04-11T18:00:00.000Z",
            time: "17:30:00",
            location: "a random basement somewhere",
            created_by: "lee",
            invited: "sam",
            host_flaked: false,
            invitee_flaked: false,
          },
        ],
        events_invited: [
          {
            event_id: 3,
            title: "Minecraft LAN party",
            description: "blocks and doritos",
            date: "2025-04-11T18:00:00.000Z",
            time: "20:00:00",
            location: "Your house",
            created_by: "steph",
            invited: "lee",
            host_flaked: false,
            invitee_flaked: false,
          },
        ],
      },
    },
  },
  "PATCH /api/events/:eventId": {
    description:
      "updates set properties on the event object, invited, host_flaked, invitee_flaked",
    queries: [
      "?action=hostFlaked",
      "?action=inviteeFlaked",
      "?action=inviteFriend",
    ],
    "example-response": {
      event: {
        event_id: 1,
        title: "Northcoders Graduation",
        description: "drinks and snacks",
        date: "2025-04-11T18:00:00.000Z",
        time: "18:00:00",
        location: "Manchester",
        created_by: "sam",
        invited: "steph",
        host_flaked: true,
        invitee_flaked: true,
      },
    },
  },
  "POST /api/events": {
    description:
      "serves a newly posted events object and associates it with the user",
    "example-body": {
      title: "Big Bday Bash",
      description: "come celebrate me",
      date: "2025-04-29T00:00:00.000Z",
      time: "20:00:00",
      location: "My House",
      created_by: "deedee",
      invited: "lee",
    },
    "example-response": {
      event_id: 6,
      title: "Big Bday Bash",
      description: "come celebrate me",
      date: "2025-04-29T18:00:00.000Z",
      time: "20:00:00",
      location: "My House",
      created_by: "deedee",
      invited: "lee",
      host_flaked: false,
      invitee_flaked: false,
    },
  },
};

export default endpoints;
