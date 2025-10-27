// import * as express from 'express';
import express,{ Request, Response } from 'express';

import logger from './utils/logger'


import morgan from "morgan";

import cors from 'cors';
import rootRouter from './route/route';

const app: express.Express = express(); // Connect to Redis server
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    morgan("combined", {
        stream: {
            write: (message: string) => logger.info(message.trim())
        }
    })
)
app.get('/',(req: Request,res:Response)=>{
    res.send('API is working. CORS is enabled for all origins.');
});

app.use('/api', rootRouter);

export default app;

