import type { FastifyInstance } from "fastify";

import type { CreateUserController } from "../controllers/create-user.controller";

export async function registerUserRoutes(
  app: FastifyInstance,
  createUserController: CreateUserController,
): Promise<void> {
  app.post("/users", async (request, reply) => {
    await createUserController.handle(request, reply);
  });
}
