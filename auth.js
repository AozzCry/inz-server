export function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({ message: "Not logged in" });
}

export function isAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin === true) {
      return next();
    }
    return res.status(401).send({ message: "Not an admin" });
  }
  return res.status(401).send({ message: "Not logged in" });
}
