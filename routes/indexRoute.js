import { Router } from "express";

/* GET home page. */
export default /* */ Router().get("/", function (req, res) {
  res.json("API says hello");
});
