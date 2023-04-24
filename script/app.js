const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const date = require("date-and-time");

mongoose.connect("mongodb://127.0.0.1:27017/blog-journals")

const app = express();

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model("Post", postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const homePageDefaultContent =
  "Amidst the hustle and bustle of the city, I found solace in the small things. The sound of rain tapping against the window, the smell of fresh coffee in the morning, and the sight of a rainbow after a storm. It's easy to get caught up in the chaos, but sometimes all it takes is a moment of mindfulness to appreciate the beauty around us.";
const aboutPageDefaultContent =
  "At our company, we're passionate about providing our customers with high-quality products and services. We believe that our success is directly tied to the satisfaction of our customers, so we work hard every day to exceed their expectations. Our team is made up of experienced professionals who are committed to delivering exceptional results, and we're always striving to improve our processes and refine our approach. Whether you're a new customer or a longtime partner, you can count on us to provide the support and solutions you need to achieve your goals. Thank you for choosing us as your partner in success!";
const contactPageDefaultContent =
  "Thank you for visiting my website! If you have any questions, comments, or would like to collaborate on a project, please don't hesitate to reach out. I am always interested in connecting with like-minded individuals and exploring new opportunities. You can contact me directly through the form below, and I will get back to you as soon as possible. I look forward to hearing from you!";

const todaysDate = date.format(new Date(), "DD MMM YYYY (dddd)");

const startingInstructions = new Post({
  title: "Instructions",
  blogContent:
    'To use our blog website, simply navigate to the "Compose" route on the homepage. There, you can create and write your blog post. Once you have finished, click on the "Publish" button to publish your blog post to the website for others to see. You can also browse and read other blog posts on the homepage by simply clicking on them. Happy blogging!',
  dateCreated: todaysDate,
  createdBy: "Admin"
});

app.get("/", (req, res) => {
  Post.find().then((post) => {
    if (post.length === 0) {
      Post.insertMany([startingInstructions])
        .then(() => {
          console.log("Added starting instructions");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    res.render("home", {
      homePageDefaultContent: homePageDefaultContent,
      postList: post,
    });
  });
});

// app.get("/", (req, res) => {
//   res.render("home", {
//     homeStartingContent: homeStartingContent,
//     postList: postList,
//   });
// });

app.get("/about", (req, res) => {
  res.render("about", { aboutPageDefaultContent: aboutPageDefaultContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactPageDefaultContent: contactPageDefaultContent });
});

// app.get("/compose", (req, res) => {
//   res.render("compose", {});
// });

// app.get("/post/:blogId", (req, res) => {
//   let selectedPost = "";

//   for (let i = 0; i < postList.length; i++) {
//     if (_.lowerCase(postList[i].postTitle) === _.lowerCase(req.params.blogId)) {
//       selectedPost = postList[i];
//       break;
//     } else {
//     }
//   }
//   res.render("post", { selectedPost: selectedPost });
// });

// app.post("/compose", (req, res) => {
//   const newPost = {
//     postTitle: req.body.blogTitle,
//     postContent: req.body.blogContent,
//   };
//   res.redirect("/");
//   postList.push(newPost);
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
