import { Router } from "express";
import { Otp } from "../controller/Otp.Controller";

import {  GenerateBill, PaymentReceived, PaymentRemainder } from "../controller/Payment.Controller";

import { meeting_cancelled, meeting_reminder, meeting_schedule } from "../controller/meeting.controller";
import { newUser } from "../controller/user.controller";
import { getLogs } from "../controller/log.controller";
import { membership_activation_confirmation, MemberSigninConfirmation } from "../controller/membership.controller";

const rootRouter: Router = Router();

rootRouter.get('/logs',getLogs);

rootRouter.post("/otp", Otp);

rootRouter.post("/new_user",newUser)

rootRouter.post("/membership_activation_confirmation",membership_activation_confirmation);
rootRouter.post("/member_signin_confirmation",MemberSigninConfirmation);


rootRouter.post("/bill_generated",GenerateBill);
rootRouter.post("/payment_received", PaymentReceived);
rootRouter.post("/payment_remainder",PaymentRemainder);


rootRouter.post('/meeting_schedule',meeting_schedule); //done

rootRouter.post('/meeting_reminder',meeting_reminder); //done

rootRouter.post('/meeting_cancelled',meeting_cancelled);  //done
export default rootRouter;