"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import RedisService from "./utils/Redis"
const logger_1 = __importDefault(require("./utils/logger"));
const secrets_1 = require("./secrets");
// const redis = RedisService.getInstance();
const server = app_1.default.listen(secrets_1.PORT || 4000, () => {
    logger_1.default.info(`Server running on port ${secrets_1.PORT}`);
});
// Graceful shutdown
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Shutting down server...");
    server.close();
    //   await PrismaService.disconnect();
    //   await redis.disconnect();
    process.exit(0);
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
