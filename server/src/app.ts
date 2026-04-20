import dotenv from "dotenv";
import { connectDB } from "./database/database.js";

import { connectGraphQL } from "./graphql/graphql.js";
dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;

connectDB(mongoURI);

const graphql = connectGraphQL(port, envMode);

// const app = express();

// app.use(
//   helmet({
//     contentSecurityPolicy: envMode !== "DEVELOPMENT",
//     crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "*", credentials: true }));
// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // your routes here

// app.get("/*splat", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found",
//   });
// });

// app.use(errorMiddleware);

// app.listen(port, () =>
//   console.log(
//     "Server is working on Port:" + port + " in " + envMode + " Mode.",
//   ),
// );
