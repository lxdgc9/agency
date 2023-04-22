import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

const f = Fastify();

f.register(cors);
f.register(helmet);

f.setErrorHandler((err, _, rep) => {
  console.log(err);
  err instanceof HttpErr
    ? rep.status(err.code).send(err.message)
    : rep.status(500).send({ msg: "SOMETHING_WENT_WRONG" });
});

f.listen({ port: 5000 }, (err, addr) => {
  err ? process.exit(1) : console.log("Listening on", addr);
});
