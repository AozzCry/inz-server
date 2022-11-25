import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

export function Register(req, res) {
  const { firstname, lastname, username, email, password } = req.body;
  try {
    User.findOne({ email }, async (existingUser) => {
      if (existingUser) {
        res.status(409).json({ message: "User already exists." });
      } else {
        new User({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: await bcrypt.hash(password, 10),
        }).save();
        res.status(201).json({ message: "Successfully created an account." });
      }
    });
  } catch (err) {
    res.json({ message: "Couldn't crerata an account: " + err });
  }
}

export function Login(req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    try {
      if (!user) {
        res.status(401).json(info);
      } else {
        req.login(user, function (err) {
          res.status(200).json({ message: info.message, user: req.user });
        });
      }
    } catch (err) {
      res.json({
        message: "Couldn't log in: " + err + " " + info + " " + error,
      });
    }
  })(req, res, next);
}

export function Logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.json({ message: "Couldn't log out: " + err });
    } else {
      res.status(200).json({ message: "Succesfully logged out." });
    }
  });
}
