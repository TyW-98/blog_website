const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const ejs = require("ejs");

const app = express();
const postList = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homeStartingContent =
  "Amidst the hustle and bustle of the city, I found solace in the small things. The sound of rain tapping against the window, the smell of fresh coffee in the morning, and the sight of a rainbow after a storm. It's easy to get caught up in the chaos, but sometimes all it takes is a moment of mindfulness to appreciate the beauty around us.";
const aboutContent =
  "At our company, we're passionate about providing our customers with high-quality products and services. We believe that our success is directly tied to the satisfaction of our customers, so we work hard every day to exceed their expectations. Our team is made up of experienced professionals who are committed to delivering exceptional results, and we're always striving to improve our processes and refine our approach. Whether you're a new customer or a longtime partner, you can count on us to provide the support and solutions you need to achieve your goals. Thank you for choosing us as your partner in success!";
const contactContent =
  "Thank you for visiting my website! If you have any questions, comments, or would like to collaborate on a project, please don't hesitate to reach out. I am always interested in connecting with like-minded individuals and exploring new opportunities. You can contact me directly through the form below, and I will get back to you as soon as possible. I look forward to hearing from you!";

app.get("/", (req, res) => {
  res.render("home", { homeStartingContent: homeStartingContent, postList: postList});
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.post("/compose", (req, res) => {
  const newPost = {
    postTitle: req.body.blogTitle,
    postContent: req.body.blogContent,
  };
  res.redirect("/")
  postList.push(newPost);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
