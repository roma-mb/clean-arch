import { buildApp } from "./app";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";

async function start(): Promise<void> {
  const app = buildApp();

  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`HTTP server running on ${HOST}:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
