#!/usr/bin/env node
import http from "http";

import { config } from "dotenv";

import { app } from "../app";
import { runFirebase } from "../admin";
import { connect } from "../db";

config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET must be defined");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET must be defined");
}

runFirebase();
connect(process.env.MONGO_URI);

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(
  val: string
): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind =
    typeof port === "string"
      ? `Pipe ${port}`
      : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? `pipe ${addr}`
      : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
}
