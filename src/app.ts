import cors from "cors";
import express from "express";
import helmet from "helmet";

import { authRouter } from "./route/auth";
import { catchErr } from "./middleware/catch-err";
import { HttpErr } from "./err/http";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);

app.use("*", () => {
  throw new HttpErr(404, "REQ_NOT_FOUND");
});

app.use(catchErr);

export { app };
