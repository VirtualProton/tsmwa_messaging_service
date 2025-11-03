"use strict";
// import { PrismaClient, Prisma } from "@prisma/client";
// import logger from "./logger";
// class PrismaService {
//     private static instance: PrismaClient;
//     private constructor() { }
//     public static getInstance(): PrismaClient {
//         if (!PrismaService.instance) {
//                         // Pass the `log` option to the constructor to enable event listeners
//             const logConfig = [
//                 { level: 'query', emit: 'event' },
//                 { level: 'info', emit: 'event' },
//                 { level: 'warn', emit: 'event' },
//                 { level: 'error', emit: 'event' },
//             ] as const satisfies Prisma.LogDefinition[];
//             const client = new PrismaClient({log:logConfig});
//             // Correctly typed $on events
//             client.$on('query', (e: any) => {
//                 logger.info(`Prisma Query: ${e.query} - Duration: ${e.duration}ms`);
//             });
//             client.$on('info', (e:any) => logger.info(`Prisma Info: ${e.message}`));
//             client.$on('warn', (e:any) => logger.warn(`Prisma Warn: ${e.message}`));
//             client.$on('error', (e:any) => logger.error(`Prisma Error: ${e.message}`));
//             PrismaService.instance = client;
//             logger.info("Prisma singleton initialized");
//         }
//         return PrismaService.instance;
//     }
//     public static async disconnect() {
//         if (PrismaService.instance) {
//             await PrismaService.instance.$disconnect();
//             logger.info("Prisma singleton disconnected");
//         }
//     }
// }
// export default PrismaService;
