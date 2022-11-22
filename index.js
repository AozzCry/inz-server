import { config } from "dotenv";
import { connect } from "mongoose";
import express from "express";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passport-config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

config();

connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log("Database connection established");
  }
);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
    },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/", authRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
