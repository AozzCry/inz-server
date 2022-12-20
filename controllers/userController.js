import User from "../models/userModel.js";

export function getSelfUser(req, res) {
  res.status(200).json(req.user);
}
export function updateSelfUser(req, res) {
  const newUser = new User(req.user);
  req.body.firstname && (newUser.firstname = req.body.firstname);
  req.body.lastname && (newUser.lastname = req.body.lastname);
  req.body.username && (newUser.username = req.body.username);
  req.body.email && (newUser.email = req.body.email);
  const error = newUser.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else if (newUser.email !== req.user.email) {
    User.findOne({ email: newUser.email }, (error, user) => {
      if (error) res.status(400).json({ message: error.message });
      else if (user)
        res
          .status(400)
          .json({ message: "User with this email already exists." });
      else {
        req.user = newUser;
        req.user.save();
        res.status(201).json({ message: "User modified." });
      }
    });
  } else {
    req.user = newUser;
    req.user.save();
    res.status(201).json({ message: "User modified." });
  }
}
export function deleteSelfUser(req, res) {
  User.deleteOne(req.user, (error) => {
    if (error) res.json({ message: "Couldn't delete user: " + error });
    else res.status(204).json({ message: "User deleted." });
  });
}
export function addOrUpdateSelfUserAddress(req, res) {
  if (
    typeof req.body.street === "string" &&
    typeof req.body.streetNr === "string" &&
    typeof req.body.city === "string" &&
    typeof req.body.postalCode === "string"
  ) {
    req.user.address = req.body;
    req.user.save();
    res.status(201).json({ message: "Address succesfully changed." });
  } else {
    res.status(400).json({ message: "Address missing fields or wrong types" });
  }
}

export function getAllUsers(req, res) {
  User.find(
    {},
    ["username", "email", "isBanned", "isAdmin"],
    (error, users) => {
      if (error) res.json({ message: "Couldn't get users: " + error });
      else if (!users) res.status(204).json({ message: "There are no users." });
      else res.status(200).json(users);
    }
  );
}

export function banUserByID(req, res) {
  if (req.body.id) {
    User.findById(req.body.id, (error, user) => {
      if (error) res.json({ message: "Couldn't remove user: " + error });
      else if (!user) res.status(404).json({ message: "User doesn-t exist" });
      else if (user.email === req.user.email)
        res.status(400).json({ message: "You can't ban yourself." });
      else {
        user.isBanned = !user.isBanned;
        user.save();
        res.status(200).json({ message: "User banned." });
      }
    });
  } else res.status(400).json({ message: "User id required." });
}
export function deleteUserByID(req, res) {
  if (req.body.id) {
    User.findById(req.body.id, (error, user) => {
      if (error) res.json({ message: "Couldn't delete user: " + error });
      else if (!user) res.status(404).json({ message: "User doesn't exist" });
      else if (user.email === req.user.email)
        res.status(400).json({ message: "You can't delete yourself." });
      else {
        user.deleteOne();
        res.status(200).json({ message: "User deleted." });
      }
    });
  } else res.status(400).json({ message: "User id required." });
}
