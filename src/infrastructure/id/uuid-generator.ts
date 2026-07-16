import { randomUUID } from "node:crypto";

import type { IdGenerator } from "../../shared/protocols/id-generator";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
