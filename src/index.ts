import express,{Express, Request, Response} from 'express';
import { PORT, REDIS_URL } from './secrets';
import rootRouter from './route/route';
// import { PrismaClient } from '@prisma/client';
// import { errorMiddleware } from './middlewares/errors';
import morgan from "morgan";
import logger from "./utils/logger";
import cors from 'cors';
// import Redis from 'ioredis';

const app:Express = express(); // Connect to Redis server
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
app.get('/',(req:Request,res:Response)=>{
    res.send('This is a api for TSMWA messaging service. CORS is enabled for all origins.');
});

app.use('/api', rootRouter);


// export const redis = new Redis(REDIS_URL);
// export const prismaClient = new PrismaClient({
//     log:['query']
// });
// app.use(errorMiddleware);


app.listen(PORT || 8000, async()=>{

    // await redis.flushall();
    console.log("APP is working", `Port: ${PORT}`);

})

