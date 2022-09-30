//calling modlues
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const ejs = require("ejs");
//setting content for each page
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//declaring onjects
var blogPosts = [];


//dec;arimgg app

const app = express();
//setting view folder for ejs
app.set("view engine", "ejs");
//using body parser
app.use(bodyParser.urlencoded({ extended: true }));
//declaring static folder
app.use(express.static("public"));

//get request for home route
app.get("/", function (res, res) {
  res.render("home", { homeContentEJS: homeStartingContent, blog: blogPosts });
});
//get request for about route
app.get("/about", function (res, res) {
  res.render("about", { aboutContentEJS: aboutContent });
});
//get request for contact routr
app.get("/contact", function (res, res) {
  res.render("contact", { contactContentEJS: contactContent });
});
//get requet for compose route
app.get("/compose", function (req, res) {
  res.render("compose", { contactContentEJS: contactContent });
});
//get for parameters
app.get("/blogs/:postName",function(req ,res){
  
  const requestedPage = _.lowerCase(req.params.postName);

  blogPosts.forEach(function(match){
    const storedPage = _.lowerCase(match.title);
    if (requestedPage === storedPage){
      let postTitleIn = match.title;

      let postBodyIn = match.body;
     
res.render("blog",{postTitleOut: postTitleIn  , postBodyOut: postBodyIn} )
    }
    else{
      console.log("not found");
    }
  })
 
})
//post for compose
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };
  blogPosts.push(post);
  
  res.redirect("/");
});

//setting port no for heroku and local host
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
