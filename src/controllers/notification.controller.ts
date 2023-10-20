import { Request, Response } from "express";
import { supabase } from "../config/supabase.js";

type NotificationDetails = {
    id: number;
    status: "unread" | "read";
    read_at: Date | string;
    created_at: Date | string;
    details: string;
    user_name: string;
    feedback_id: number;
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        let query = supabase
        .from("notifications")
        .select("id, status, read_at, created_at, replies(details, users(name)), feedbacks(id)");
        
        // const lastNotifDate = req.query.after;
        // if (lastNotifDate) {
        //     query = query.gt("created_at", lastNotifDate.toString());
        // }

        const { data, error } = await query.order("created_at", {ascending: false});

        let formatData: NotificationDetails[] = [];

        data.forEach((d) =>
            formatData.push({
                id: d.id,
                status: d.status,
                read_at: d.read_at,
                created_at: d.created_at,
                details: d.replies.details,
                user_name: d.replies.users["name"],
                feedback_id: d.feedbacks.id,
            })
        );

        if (!error) res.status(200).send({ data: formatData, success: true });
        else throw error;
    } catch (error) {
        console.log("Error in getAllFeedbacks -", error);
        res.send({ success: false, error });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        if (!req.query.ids) throw "Invalid request";

        // to mark multiple notifs as read
        const ids = req.query.ids.toString().split(",");
        let notifs = []
        ids.map((id) => {
            notifs.push({id, read_at: new Date().toISOString(), status: "read"});
        })

        for (let inx = 0; inx < ids.length; inx++) {
            const { data, error } = await supabase
                .from("notifications")
                .update({read_at: new Date().toISOString(), status: "read"}).eq("id", ids[inx]);
            if (error) throw error;
        }

        res.send({ data:"Marked notifications as read", success: true });
    } catch (error) {
        console.log("Error in markNotificationAsRead - ", error);
        res.send({ success: false, error });
    }
};

export const markAsUnread = async (req: Request, res: Response) => {
    try {
        if (!req.query.id) throw "Invalid request";

        const { error } = await supabase
            .from("notifications")
            .update({ read_at: null, status: "unread" }).eq("id", req.query.id.toString());
        if (error) throw error;

        res.send({ data:"Marked notification as unread", success: true });
    } catch (error) {
        console.log("Error in markNotificationAsRead - ", error);
        res.send({ success: false, error });
    }
};

