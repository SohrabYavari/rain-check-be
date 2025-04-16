export type TEventsData = {
  event_id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  created_by: string;
  invited: string;
  host_flaked: boolean;
  invitee_flaked: boolean;
};

export type TUsersData = {
  username: string;
  email: string;
  password: string;
};

// actions enum
export enum PatchActions {
  InviteeFlaked = "inviteeFlaked",
  HostFlaked = "hostFlaked",
  InviteFriend = "inviteFriend",
}