import express from "express";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import passportProviders from "./passport/passport.provider.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import router from "./routes/index.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
passportProviders.GoogleProvider();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.BACKEND_URL, process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", router);

const port = process.env.PORT;
await mongoose.connect(process.env.MONGODB_URI).then((conn) => {
  console.log(`Database is connected to : ${conn.connection.host}`);
  app.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`);
  });
});
