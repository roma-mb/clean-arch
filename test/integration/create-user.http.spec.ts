import { buildApp } from "../../src/main/app";

describe("POST /users", () => {
  it("should return 201 for valid payload", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        name: "Alice",
        email: "alice@example.com",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();
    expect(body.name).toBe("Alice");
    expect(body.email).toBe("alice@example.com");

    await app.close();
  });

  it("should return 409 for duplicated email", async () => {
    const app = buildApp();

    await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        name: "Alice",
        email: "alice@example.com",
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        name: "Another",
        email: "alice@example.com",
      },
    });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toEqual({ message: "Email already in use" });

    await app.close();
  });

  it("should return 400 for invalid email", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        name: "Alice",
        email: "invalid-email",
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });
});
