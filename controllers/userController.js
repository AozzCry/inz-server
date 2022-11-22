import User from "../models/userModel.js";

export function getUser(req, res) {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send("Couldn't get user: " + error);
  }
}
export function userCreate(req, res) {
  try {
    User.create(req.body);
    res.status(200).send("User created.");
  } catch (error) {
    res.status(400).send(error);
  }
}
export function userAddAdress(req, res) {
  try {
    User.findById(req.user.id, (error, user) => {
      if (!user) return "User not found.";
      user.address = req.body;
      user.save();
      res.status(200).send("Address added.");
    });
  } catch (error) {
    res.status(400).send(error);
  }
}
