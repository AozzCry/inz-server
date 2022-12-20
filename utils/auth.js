export function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isBanned === false) {
      next();
    } else {
      res.status(401).json({ message: "You are banned." });
    }
  } else {
    res.status(401).json({ message: "Not logged in." });
  }
}

export function isAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin === true) {
      if (req.user.isBanned === false) {
        next();
      } else {
        res.status(401).json({ message: "You are banned." });
      }
    } else {
      res.status(401).json({ message: "Not an admin." });
    }
  } else {
    res.status(401).json({ message: "Not logged in." });
  }
}
