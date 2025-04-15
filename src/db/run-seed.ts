import { seedData } from './data/dev-data/index'
import seed from "./seed";
import db from "../server/connection";

const runSeed = async () => {
  await seed(seedData);
  return await db.end();
};

runSeed();