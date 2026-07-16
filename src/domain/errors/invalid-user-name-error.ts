import { DomainError } from "./domain-error";

export class InvalidUserNameError extends DomainError {
  constructor() {
    super("Name must have at least 2 characters");
  }
}
