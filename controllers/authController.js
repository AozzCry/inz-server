import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

export async function Register({ body }, res) {
  const newUser = new User({
    ...body,
    email: body.email.toLowerCase(),
    password: await bcrypt.hash(body.password, 10),
  });
  const error = newUser.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else {
    User.findOne({ email: body.email }, (error, user) => {
      if (user)
        res
          .status(409)
          .json({ message: "User with this email already exists." });
      else {
        newUser.save();
        res.status(201).json({ message: "Successfully created an account." });
      }
    });
  }
}

export function Login(req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) res.status(400).json({ message: "Couldn't log in: " + error });
    if (!user) res.status(400).json({ message: info.message });
    else {
      if (user.isBanned === true)
        res.status(401).json({ message: "Account banned." });
      else {
        req.login(user, function (error) {
          if (error) res.json({ message: "Couldn't log in: " + error });
          else {
            res.status(200).json({ message: info.message });
          }
        });
      }
    }
  })(req, res, next);
}

export function Logout(req, res) {
  req.logout(function (error) {
    if (error) res.status(400).json({ message: "Couldn't log out: " + error });
    else res.status(200).json({ message: "Succesfully logged out." });
  });
}

export function refreshSession(req, res) {
  if (req.isAuthenticated()) {
    res.status(200).json({
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      userId: req.user._id,
    });
  } else {
    res
      .status(204)
      .json({ username: null, email: null, isAdmin: null, userId: null });
  }
}
