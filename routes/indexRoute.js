import { Router } from "express";

export default /* */ Router().get("/", function (req, res) {
  res.json("API says hello");
});
