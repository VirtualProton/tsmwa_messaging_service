"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as express from 'express';
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route/route"));
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
    res.send('API is working. CORS is enabled for all origins.');
});
app.use('/api', route_1.default);
exports.default = app;
