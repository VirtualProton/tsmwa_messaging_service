import app from "./app";
// import RedisService from "./utils/Redis"
import logger from "./utils/logger";
import {PORT} from './secrets';


// const redis = RedisService.getInstance();

const server = app.listen(PORT || 4000, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info("Shutting down server...");
  server.close();
//   await PrismaService.disconnect();
//   await redis.disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);