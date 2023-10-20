import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import appRouter from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => res.send("Notifications API"));
app.use("/api", appRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
