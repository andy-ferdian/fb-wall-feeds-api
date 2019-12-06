require("dotenv").config();

var express = require("express");
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;
const request = require("request-promise");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      clientID: process.env["FACEBOOK_CLIENT_ID"],
      clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
      callbackURL: "/return",
      scope: "user_posts"
    },
    function(accessToken, refreshToken, profile, cb) {
      localStorage.setItem("accessToken", accessToken);
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Define routes.
app.get("/", function(req, res) {
  res.render("home", { user: req.user });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/login/facebook", passport.authenticate("facebook"));

app.get(
  "/return",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/profile", require("connect-ensure-login").ensureLoggedIn(), function(
  req,
  res
) {
  res.render("profile", { user: req.user });
});

app.get("/user-feeds/:id", (req, res) => {
  const userFieldSet = "feed{caption,message,comments,picture}";

  const options = {
    method: "GET",
    uri: `https://graph.facebook.com/v5.0/${req.params.id}`,
    qs: {
      access_token: localStorage.getItem("accessToken"),
      fields: userFieldSet
    }
  };
  request(options).then(fbRes => {
    res.send(JSON.parse(fbRes));
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.listen(process.env["PORT"] || 5000, function() {
  console.log(`The server has Started!, PORT: ${process.env["PORT"] || 5000}`);
});
