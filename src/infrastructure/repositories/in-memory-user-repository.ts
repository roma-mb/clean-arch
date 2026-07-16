import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email.getValue() === email);
    return user ?? null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
