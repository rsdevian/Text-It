import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { app, server } from "./socket/socket.js"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const port = process.env.PORT;

const __dirname = path.resolve()

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.use(express.static((path.join(__dirname,"/client/dist"))))

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

server.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on port http://localhost:${port}`);
})
