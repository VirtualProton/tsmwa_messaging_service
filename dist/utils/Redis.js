"use strict";
// import { createClient, RedisClientType } from "redis";
// import logger from "./logger";
// import { REDIS_URL } from '../secrets';
// class RedisService {
//   private static instance: RedisService;
//   private client: RedisClientType;
//   private constructor() {
//     // Create Redis client
//     this.client = createClient({ url: REDIS_URL || "redis://localhost:6379" });
//     // Attach event listeners
//     this.client.on("error", (err: Error) => logger.error(`Redis Error: ${err.message}`));
//     this.client.on("connect", () => logger.info("Redis connecting..."));
//     this.client.on("ready", () => logger.info("Redis ready"));
//     // Connect immediately
//     this.connect();
//   }
//   public static getInstance(): RedisService {
//     if (!RedisService.instance) {
//       RedisService.instance = new RedisService();
//     }
//     return RedisService.instance;
//   }
//   // Initialize connection
//   private async connect() {
//     try {
//       await this.client.connect();
//       logger.info("Redis connection established.");
//     } catch (err) {
//       logger.error(`Redis connection failed: ${err}`);
//     }
//   }
//   // Accessor for client
//   public getClient(): RedisClientType {
//     return this.client;
//   }
//   // Destructor / cleanup method
//   public async disconnect() {
//     if (this.client.isReady) {
//       try {
//         await this.client.quit();
//         logger.info("Redis connection closed.");
//       } catch (err) {
//         logger.error(`Error disconnecting Redis: ${err}`);
//       }
//     }
//   }
// }
// export default RedisService;
