import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import profileRouter from "./routes/profile.route.js"

app.use("/api/profiles", profileRouter)

app.get("/", (req, res) => res.send("✅ Backend running"));

export { app }