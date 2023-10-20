import {Router} from "express";
import { getNotifications, markAsRead, markAsUnread } from "../controllers/notification.controller.js";

export const notificationRouter = Router();

notificationRouter.route("/get-notifications").get(getNotifications);
notificationRouter.route("/mark-as-read").put(markAsRead);
notificationRouter.route("/mark-as-unread").put(markAsUnread);


