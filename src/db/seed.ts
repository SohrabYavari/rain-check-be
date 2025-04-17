import { TEventsData, TUsersData } from "../types/TData";
import {
  dropTables,
  createUsersTable,
  createEventsTable,
  seedUsers,
  seedEvents,
} from "./manageTables";

const seed = async (seedData: {
  events: TEventsData[];
  users: TUsersData[];
}) => {
  await dropTables();
  await createUsersTable();
  await createEventsTable();
  await seedUsers(seedData.users);
  await seedEvents(seedData.events);
};

export default seed;
