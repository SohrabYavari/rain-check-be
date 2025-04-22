export type TEventsData = {
  event_id: number;
  event_img_url: string | null;
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
  avatar_img_url: string | null;
  email: string;
  password: string;
};

//? actions enum for patch func
export enum PatchActions {
  InviteeFlaked = "inviteeFlaked",
  HostFlaked = "hostFlaked",
  InviteFriend = "inviteFriend",
}
