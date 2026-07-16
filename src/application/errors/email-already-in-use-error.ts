import { ApplicationError } from "./application-error";

export class EmailAlreadyInUseError extends ApplicationError {
  constructor() {
    super("Email already in use");
  }
}
