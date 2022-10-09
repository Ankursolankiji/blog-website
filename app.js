//calling modlues
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https"); //importing http module
const _ = require('lodash');
const ejs = require("ejs");
//setting content for each page
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "A web developer who likes to keep and simple and clean. Currently doing BCA from Maharaja Surajmal Institute ";
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
//signup feature
app.get("/newsletter", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
  //to show sign up [o
});
app.post("/newsletter", function (req, res) {
  //taking data from form  with body-parser
  const firstNames = req.body.firstName;
  const SecondNames = req.body.secondName;
  const emails = req.body.email;
  
  const data = {
    members: [
      {//declaring members as js object
        email_address: emails,
        status: "subscribed",
        merge_fields: {
          FNAME: firstNames,
          LNAME: SecondNames,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);//js object to json 
  //declaring vars for posting ours members
  const url = "https://us8.api.mailchimp.com/3.0/lists/2f5114433e";
  const options = {
    method: "POST",
    auth: "ankur:a961a24d2eeb6173fb9d3025b7a3ff78-us8",
  };
  
  const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){
      
        res.sendFile(__dirname + "/success.html")
      //sending sucess on code 200
    }
    else{
        res.sendFile(__dirname + "/failure.html")
        //sending failure if something goes wrong
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //sending the request dta to chipmunk
  request.write(jsonData);
  request.end();
});
//redirecting to the the / on failure
app.post("/success",function(req,res){
  res.redirect("/")
})
//redirecting to the the / on failure
app.post("/failure",function(req,res){
  res.redirect("/newsletter")
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
