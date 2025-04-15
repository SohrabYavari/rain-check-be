export type TEventsData = {
  event_id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  created_by: string;
  invited: string;
  host_flaked: number;
  invitee_flaked: number;
};

export type TUsersData = {
  username: string;
  email: string;
  password: string;
};
