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
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const route_1 = __importDefault(require("./route/route"));
// import { PrismaClient } from '@prisma/client';
// import { errorMiddleware } from './middlewares/errors';
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
// import Redis from 'ioredis';
const app = (0, express_1.default)(); // Connect to Redis server
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: (message) => logger_1.default.info(message.trim())
    }
}));
app.get('/', (req, res) => {
    res.send('This is a api for TSMWA messaging service. CORS is enabled for all origins.');
});
app.use('/api', route_1.default);
// export const redis = new Redis(REDIS_URL);
// export const prismaClient = new PrismaClient({
//     log:['query']
// });
// app.use(errorMiddleware);
app.listen(secrets_1.PORT || 8000, () => __awaiter(void 0, void 0, void 0, function* () {
    // await redis.flushall();
    console.log("APP is working");
}));
