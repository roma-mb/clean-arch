import { CreateUserUseCase } from "../../../src/application/use-cases/create-user.use-case";
import { EmailAlreadyInUseError } from "../../../src/application/errors/email-already-in-use-error";
import type { User } from "../../../src/domain/entities/user";
import type { UserRepository } from "../../../src/domain/repositories/user-repository";
import type { IdGenerator } from "../../../src/shared/protocols/id-generator";

class UserRepositoryStub implements UserRepository {
  public savedUsers: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.savedUsers.find((user) => user.email.getValue() === email) ?? null;
  }

  async save(user: User): Promise<void> {
    this.savedUsers.push(user);
  }
}

class IdGeneratorStub implements IdGenerator {
  generate(): string {
    return "fixed-id";
  }
}

describe("CreateUserUseCase", () => {
  it("should create user with normalized email", async () => {
    const repository = new UserRepositoryStub();
    const idGenerator = new IdGeneratorStub();
    const sut = new CreateUserUseCase(repository, idGenerator);

    const result = await sut.execute({
      name: "Jane Doe",
      email: "  JANE@EXAMPLE.COM  ",
    });

    expect(result.id).toBe("fixed-id");
    expect(result.email).toBe("jane@example.com");
    expect(repository.savedUsers).toHaveLength(1);
  });

  it("should throw when email already exists", async () => {
    const repository = new UserRepositoryStub();
    const idGenerator = new IdGeneratorStub();
    const sut = new CreateUserUseCase(repository, idGenerator);

    await sut.execute({ name: "First User", email: "same@example.com" });

    await expect(
      sut.execute({ name: "Second User", email: "same@example.com" }),
    ).rejects.toThrow(EmailAlreadyInUseError);
  });
});
