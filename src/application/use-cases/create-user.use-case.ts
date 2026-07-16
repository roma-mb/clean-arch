import type { CreateUserInput } from "../dto/create-user-input";
import type { CreateUserOutput } from "../dto/create-user-output";
import { EmailAlreadyInUseError } from "../errors/email-already-in-use-error";
import type { UserRepository } from "../../domain/repositories/user-repository";
import { User } from "../../domain/entities/user";
import { Email } from "../../domain/value-objects/email";
import type { IdGenerator } from "../../shared/protocols/id-generator";
import type { Logger } from "../../shared/protocols/logger";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly logger?: Logger,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const email = Email.create(input.email);

    const alreadyExists = await this.userRepository.findByEmail(email.getValue());
    if (alreadyExists) {
      throw new EmailAlreadyInUseError();
    }

    const user = User.create({
      id: this.idGenerator.generate(),
      name: input.name,
      email,
    });

    await this.userRepository.save(user);
    this.logger?.info("User created", { userId: user.id });

    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      createdAt: user.createdAt.toISOString(),
    };
  }
}
