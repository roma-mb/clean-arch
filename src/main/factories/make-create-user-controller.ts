import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { UuidGenerator } from "../../infrastructure/id/uuid-generator";
import { ConsoleLogger } from "../../infrastructure/logger/console-logger";
import { InMemoryUserRepository } from "../../infrastructure/repositories/in-memory-user-repository";
import { CreateUserController } from "../../interfaces/http/controllers/create-user.controller";

export function makeCreateUserController(): CreateUserController {
  const userRepository = new InMemoryUserRepository();
  const idGenerator = new UuidGenerator();
  const logger = new ConsoleLogger();

  const createUserUseCase = new CreateUserUseCase(userRepository, idGenerator, logger);

  return new CreateUserController(createUserUseCase);
}
