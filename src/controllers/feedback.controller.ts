import { Request, Response } from "express";
import { supabase } from "../config/supabase.js";

export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from("feedbacks").select("id, details, created_at").order("created_at");

        if (!error) res.status(200).send({ data, success: true });
        else throw error;
    } catch (error) {
        console.log("Error in getAllFeedbacks -", error);
        res.send({ success: false, error });
    }
};

export const getFeedback = async (req: Request, res: Response) => {
    try {
        const feedbackId = req.params.id;

        let { data, error } = await supabase
            .from("feedbacks")
            .select("id, details, created_at, replies(id, user_id, details, created_at, users(name))")
            .eq("id", feedbackId);

        data.forEach((item) => {
            let replies = [];
            item.replies.forEach((r) => {
                replies.push({
                    id: r.id,
                    user_id: r.user_id,
                    details: r.details,
                    created_at: r.created_at,
                    user_name: r.users["name"],
                });
            });
            item.replies = replies;
        });

        if (!error) res.status(200).send({ data, success: true });
        else throw error;
    } catch (error) {
        console.log("Error in getFeedback -", error);
        res.send({ success: false, error });
    }
};

export const createFeedback = async (req: Request, res: Response) => {
    try {
        if (!req.body || !req.body.userId || !req.body.details) throw "Invalid body";
        const { userId, details } = req.body;

        const { data, error } = await supabase.from("feedbacks").insert({ user_id: userId, details }).select();

        if (!error) res.status(200).send({ data, success: true });
        else throw error;
    } catch (error) {
        console.log("Error in createFeedback -", error);
        res.send({ success: false, error });
    }
};

export const replyToFeedback = async (req: Request, res: Response) => {
    try {
        if (!req.body || !req.body.feedbackId || !req.body.userId || !req.body.reply) throw "Invalid body";

        const { userId, feedbackId, reply } = req.body;

        const { data, error } = await supabase
            .from("replies")
            .insert({ feedback_id: feedbackId, user_id: userId, details: reply })
            .select("id, user_id, details, created_at");
        if (error) throw error;

        const {data: userData, error:userDataError} = await supabase.from("users").select('name').eq("id", data[0].user_id);
        if(userDataError) throw error;

        let replyData = {...data[0], user_name: userData[0].name};

        // create notification
        const { error: notifError } = await supabase
            .from("notifications")
            .insert({ feedback_id: feedbackId, user_id: userId, reply_id: replyData.id });
        if (notifError) throw notifError;

        res.status(200).send({ data: replyData, success: true });
    } catch (error) {
        console.log("Error in createFeedback -", error);
        res.send({ sucess: false, error });
    }
};
