import cors from "cors";
import express from "express";
import "express-async-errors";

import "@shared/container";

import { errorHandler } from "@shared/errors/errorHandler";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export { app };
