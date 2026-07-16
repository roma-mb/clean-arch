import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "Name must have at least 2 characters"),
  email: z.email("Invalid email"),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
