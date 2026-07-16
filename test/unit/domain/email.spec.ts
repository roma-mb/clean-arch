import { InvalidEmailError } from "../../../src/domain/errors/invalid-email-error";
import { Email } from "../../../src/domain/value-objects/email";

describe("Email value object", () => {
  it("should normalize email", () => {
    const email = Email.create("  USER@Example.com ");

    expect(email.getValue()).toBe("user@example.com");
  });

  it("should throw when email is invalid", () => {
    expect(() => Email.create("invalid")).toThrow(InvalidEmailError);
  });
});
