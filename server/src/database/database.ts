import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);
import mongoose from "mongoose";

export const connectDB = (uri: string) =>
  mongoose
    .connect(uri)
    .then((c) => console.log(` connected with ${c.connection.name}`))
    .catch((e) => console.log(e));
