import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connecttoMOngoDB from "./db/connectmongodb.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello hi");
})

app.listen(PORT, () => {
    connecttoMOngoDB();
    console.log(`server running on port ${PORT}`);
})