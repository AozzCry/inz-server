import { config } from "dotenv";
import { connect } from "mongoose";
import express from "express";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passport-config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import questionRoute from "./routes/questionRoute.js";
import imageRoute from "./routes/imageRoute.js";

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
    origin: [
      "https://localhost:3000",
      "http://localhost:3000",
      "https://emicro.netlify.app",
      "https://emicro-site.azurewebsites.net",
    ],
    credentials: true,
  })
);
app.use(
  session({
    //name: 'sessoion',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //secure: true,
      //httpOnly: true,
      sameSite: "strict",
    },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app
  .use("/", authRoute)
  .use("/user", userRoute)
  .use("/product", productRoute)
  .use("/category", categoryRoute)
  .use("/order", orderRoute)
  .use("/review", reviewRoute)
  .use("/question", questionRoute)
  .use("/image", imageRoute);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
