import type { CreateUserOutput } from "../../../application/dto/create-user-output";

export type CreateUserHttpResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export function toCreateUserHttpResponse(output: CreateUserOutput): CreateUserHttpResponse {
  return {
    id: output.id,
    name: output.name,
    email: output.email,
    createdAt: output.createdAt,
  };
}
