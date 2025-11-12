import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express()

const allowed = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`), false);
  },
  credentials: true
}));

/*app.use(cors({    //local code
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))*/

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import profileRouter from "./routes/profile.route.js"

app.use("/api/profiles", profileRouter)

export { app }