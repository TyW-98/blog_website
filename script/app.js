const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeStartingContent =
  "Amidst the hustle and bustle of the city, I found solace in the small things. The sound of rain tapping against the window, the smell of fresh coffee in the morning, and the sight of a rainbow after a storm. It's easy to get caught up in the chaos, but sometimes all it takes is a moment of mindfulness to appreciate the beauty around us.";

app.get("/", (req, res) => {
  res.render("home", {homeStartingContent: homeStartingContent});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
