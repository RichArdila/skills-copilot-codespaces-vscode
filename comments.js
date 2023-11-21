// Create web server
// 1. Load Express
const express = require("express");
const app = express();
// 2. Load body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// 3. Load mongoose
const mongoose = require("mongoose");
// 4. Connect to mongoose
mongoose.connect("mongodb://localhost:27017/eduonix", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// 5. Define Schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// 6. Compile Schema into a model
const Comment = mongoose.model("Comment", commentSchema);
// 7. Set view engine
app.set("view engine", "ejs");
// 8. Set up routes
// Home
app.get("/", (req, res) => {
  res.render("index");
});
// Comments
app.get("/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments", { comments: comments });
    }
  });
});
// Create
app.post("/comments", (req, res) => {
  Comment.create(req.body.comment, (err, newComment) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("comments");
    }
  });
});
// 9. Listen to port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});