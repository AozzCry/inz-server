export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.status(401).send({ message: "Not logged in" });
}
