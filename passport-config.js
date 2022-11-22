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
        User.findOne({ email: username }, (error, user) => {
          if (error) throw error;
          if (!user) return done(null, false, { message: "User not found" });
          bcrypt.compare(password, user.password, (error, result) => {
            if (error) throw error;
            if (result === true) {
              return done(null, user, {
                message: "Successfully logged in",
              });
            }
            return done(null, false, { message: "Password is incorrect" });
          });
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
