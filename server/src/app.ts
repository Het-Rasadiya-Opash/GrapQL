import dotenv from "dotenv";
import { connectDB } from "./database/database.js";
import express, { NextFunction, Request, Response } from "express";
import { expressMiddleware } from "@as-integrations/express5";
import { connectGraphQL } from "./graphql/graphql.js";
import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import helmet from "helmet";
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;

connectDB(mongoURI);

const graphqlServer = connectGraphQL();
await graphqlServer.start();
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = {
    role: "user",
  };
  if (user.role === "admin") next();
  else res.send("Not Access");
};

app.use("/graphql", isAdmin, expressMiddleware(graphqlServer));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.get("/*splat", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log(
    "Server is working on Port:" + port + " in " + envMode + " Mode.",
  ),
);
