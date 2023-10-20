import { Router } from "express";
import {feedbackRouter} from "./feedback.routes.js";
import { notificationRouter } from "./notification.routes.js";

const appRouter = Router();
appRouter.use("/feedback", feedbackRouter);
appRouter.use("/notification", notificationRouter );

export default appRouter;