import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

export default Router()
  .post("/register", async function (req, res) {
    const { firstname, lastname, username, email, password } = req.body;
    User.findOne({ email }, async (error, existingUser) => {
      if (error) throw error;
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      }).save();
      return res.status(201).send({ message: "Successfully created account" });
    });
  })
  .post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ message: info.message, user: req.user });
      });
    }),
      function (req, res, next) {
        // issue a remember me cookie if the option was checked
        if (!req.body.remember_me) {
          return next();
        }

        var token = utils.generateToken(64);
        Token.save(token, { userId: req.user.id }, function (err) {
          if (err) {
            return done(err);
          }
          res.cookie("remember_me", token, {
            path: "/",
            httpOnly: true,
            maxAge: 604800000,
          }); // 7 days
          return next();
        });
      };
  })
  .get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ message: "Succesfully logged out" });
    });
  });
