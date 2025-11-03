import { Router } from "express";
import { Otp } from "../controller/Otp.Controller";
import { welcome } from "../controller/welcome.Controller";
import { PartialPaymentReceived, PaymentReceived, PaymentRemainder } from "../controller/Payment.Controller";
import { membership_activation_reminder, membership_expired_reminder, membership_expiry_reminder } from "../controller/membership.controller";
import { meeting_cancelled, meeting_reminder, meeting_schedule } from "../controller/Meeting.Controller";
const rootRouter: Router = Router();


rootRouter.post("/otp", Otp);
rootRouter.get("/welcome", welcome)


rootRouter.post("/payment_received", PaymentReceived);
rootRouter.post("/partial_Payment_received",PartialPaymentReceived);
rootRouter.post("/payment_remainder",PaymentRemainder);


rootRouter.post("/membership_expiry_reminder",membership_expiry_reminder);
rootRouter.post("/membership_expired_reminder",membership_expired_reminder);
rootRouter.post("/membership_activation_reminder",membership_activation_reminder);

rootRouter.post('/meeting_schedule',meeting_schedule);
rootRouter.post('/meeting_reminder',meeting_reminder);
rootRouter.post('/meeting_cancelled',meeting_cancelled);
export default rootRouter;