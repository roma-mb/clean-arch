import Fastify, { type FastifyInstance } from "fastify";
import { ZodError } from "zod";

import { EmailAlreadyInUseError } from "../application/errors/email-already-in-use-error";
import { DomainError } from "../domain/errors/domain-error";
import { registerUserRoutes } from "../interfaces/http/routes/user.routes";
import { makeCreateUserController } from "./factories/make-create-user-controller";

export function buildApp(): FastifyInstance {
  const app = Fastify();
  const createUserController = makeCreateUserController();

  app.get("/healthcheck", async (request, reply) => {
    reply.status(200).send({status: 'alive'});
  });

  void registerUserRoutes(app, createUserController);

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        details: error.issues.map((issue) => issue.message),
      });
    }

    if (error instanceof EmailAlreadyInUseError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof DomainError) {
      return reply.status(400).send({ message: error.message });
    }

    app.log.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  });

  return app;
}
