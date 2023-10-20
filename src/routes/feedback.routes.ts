import {Router} from "express";
import { getAllFeedbacks, getFeedback, createFeedback, replyToFeedback } from "../controllers/feedback.controller.js";

export const feedbackRouter = Router();

feedbackRouter.route("/get-all-feedbacks").get(getAllFeedbacks);
feedbackRouter.route("/get-feedback/:id").get(getFeedback);
feedbackRouter.route("/create-feedback").post(createFeedback);
feedbackRouter.route("/reply-to-feedback").post(replyToFeedback);
