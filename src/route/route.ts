import { Router } from "express";
import { Otp } from "../controller/Otp.Controller";
const rootRouter: Router = Router();


rootRouter.post("/otp", Otp);

export default rootRouter;