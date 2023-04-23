import fastify from "fastify";
import env from "@fastify/env";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import runMongo from "./db.js";
// import runFbAdm from "./admin.js";
// import fbjson from "../fbjson.json";

const f = fastify();

f.register(cors);
f.register(helmet);
f.register(env, {
  dotenv: true,
  schema: {
    type: "object",
    required: ["NODE_ENV"],
    properties: {
      NODE_ENV: { type: "string" },
      MONGO_URI: { type: "string" },
    },
  },
});

f.setErrorHandler((e, _, rep) => {
  console.log(e);
  e instanceof HttpErr
    ? rep.status(e.code).send(e.message)
    : rep.status(500).send({ msg: "SOMETHING_WENT_WRONG" });
});

try {
  await f.ready();

  // runFbAdm(fbjson);
  // runMongo(f.config.MONGO_URI);
  console.log(f.config);
  console.log(process.env.NODE_ENV);

  await f.listen({ port: 5000 });
  console.log("Node running...");
} catch (e) {
  console.log(e);
  process.exit(1);
}
