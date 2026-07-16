import type { FastifyReply, FastifyRequest } from "fastify";

import type { CreateUserUseCase } from "../../../application/use-cases/create-user.use-case";
import { toCreateUserHttpResponse } from "../mappers/user-http.mapper";
import { createUserSchema } from "../validators/create-user.schema";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = createUserSchema.parse(request.body);

    const output = await this.createUserUseCase.execute(body);

    reply.status(201).send(toCreateUserHttpResponse(output));
  }
}
