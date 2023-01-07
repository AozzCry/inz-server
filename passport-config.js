import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import User from "./models/userModel.js";

const LocalStrategy = passportLocal.Strategy;

export default function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (username, password, done) => {
        username = username.toLowerCase();
        if (
          String(username).match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          User.findOne({ email: username }, (error, user) => {
            if (error) return done(null, false, { message: error });
            if (!user) return done(null, false, { message: "User not found" });
            if (user.isBanned)
              return done(null, false, { message: "User is banned" });
            bcrypt.compare(password, user.password, (error, result) => {
              if (error) return done(null, false, { message: error });
              if (result === false) {
                return done(null, false, { message: "Password is incorrect" });
              } else {
                return done(null, user, { message: "Successfully logged in" });
              }
            });
          });
        } else
          return done(null, false, {
            message: "Please fill a valid email address.",
          });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (error, user) {
      done(error, user);
    });
  });
}
