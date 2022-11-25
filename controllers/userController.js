import User from "../models/userModel.js";

export function getSelfUser(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.json({ message: "Couldn't get user: " + err });
  }
}
export function createUser(req, res) {
  try {
    User.create(req.body);
    res.status(201).json({ message: "User created." });
  } catch (err) {
    res.json({ message: "Couldn't crerate user: " + err });
  }
}
export function updateSelfUser(req, res) {
  try {
    User.findById(req.user.id, (error, user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.username = req.body.username;
      user.email = req.body.email;
      user.save();
      res.status(201).json({ message: "User modified." });
    });
  } catch (err) {
    res.json({ message: "Couldn't modify user: " + err });
  }
}
export function removeSelfUser(req, res) {
  try {
    User.remove(req.user);
    res.status(204).json({ message: "User removed." });
  } catch (err) {
    res.json({ message: "Couldn't remove user: " + err });
  }
}
export function addOrUpdateSelfUserAddress(req, res) {
  try {
    User.findById(req.user.id, (error, user) => {
      user.address = req.body;
      user.save();
      res.status(201).json({ message: "Address succesfully changed." });
    });
  } catch (error) {
    res.json({ message: "Couldn't add or update address: " + err });
  }
}
