import { InvalidUserNameError } from "../errors/invalid-user-name-error";
import type { Email } from "../value-objects/email";

export type CreateUserEntityParams = {
  id: string;
  name: string;
  email: Email;
  createdAt?: Date;
};

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly createdAt: Date,
  ) {}

  static create(params: CreateUserEntityParams): User {
    const normalizedName = params.name.trim();

    if (normalizedName.length < 2) {
      throw new InvalidUserNameError();
    }

    return new User(params.id, normalizedName, params.email, params.createdAt ?? new Date());
  }
}
