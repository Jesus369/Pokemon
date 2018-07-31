const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const models = require("./models");
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const dbUser = require("./dbActions/userQueries");
const dbPokemon = require("./dbActions/pokemonQueries");
const dbPost = require("./dbActions/posts");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public/script", express.static("uploads/script"));
app.use("/upload_attributes", express.static("upload_attributes"));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
app.engine("mustache", mustacheExpress());
app.use(methodOverride("_method"));
app.set("view engine", "mustache");
app.use(expressValidator());
app.set("views", "./views");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

// ROUTE FOR HOME PAGE AND DISPLAY ALL POKEMON
app.get("/home", dbPokemon.allPokemon);

app.get("/jsonpokemon", dbPokemon.allJsonPokemon);

// CREATE POKEMON PAGE
app.get("/home/createpokemon", dbPokemon.createPokemon);

// ROUTE FOR USERS TO BE DISPLAYED IN A JSON FORMAT
app.get("/home/users", dbUser.allUsers);

// ROUTE FOR REGISTERUER PAGE
app.get("/home/registeruser", (req, res) => {
  res.render("registeruser");
});

// REGISTERING THE USER
app.post("/home/registeruser", dbPost.registerUser);

// ROUTE FOR LOGIN PAGE
app.get("/home/userlogin", (req, res) => {
  res.render("userlogin");
});

// LOGGING IN THE USER
app.post("/home/userlogin", dbPost.loginUser);

// LOGOUT USER
app.get("/home/userlogout", dbUser.userLogout);

// EDIT Trainer
app.put(
  "/home/:id/traineredit?",
  upload.single("trainerimage"),
  dbPost.updateUser
);

// USER ID ROUTE
app.get("/home/:id", dbUser.userPage);

//EDIT USER/TRAINER INFO PAGE
app.get("/home/:id/traineredit", dbUser.updateUser);

//view User pokemon
app.get("/home/:id/showuserpokemon", dbUser.usersPokemon);

//view User pokemon in JSON
app.get("/home/:id/JSON", dbUser.jsonUserPokemon);

// SHOW POKEMON ID ROUTE
app.get("/home/pokemon/:id", dbPokemon.pokemonRoute);

// ROUTE FOR JSON OF POKEMON
app.get("/home/pokemon/:id/json", dbPokemon.jsonSinglePokemon);

// POKEMON UPDATE ROUTE
app.get("/home/pokemon/:id/update", dbPokemon.updatePokemon);

// INSERTING POKEID AND USERID INTO USERTOPOKEMON TABLE
app.post("/home/catchpokemon/:id", dbPost.catchPokemon);

// CREATE A POKEMON
app.post(
  "/home/createpokemon",
  upload.single("pokemonimg"),
  dbPost.createPokemon
);

// CREATE AN ELEMENT
app.post("/home/newElement", upload.single("elementImg"), dbPost.addElement);

// LINK ELEMENT TO POKEMON
app.post("/home/linkEleToPoke", dbPost.linkEleToPoke);

// LINK EVOLUTION TO POKEMON
app.post("/home/newEvolution", dbPost.newEvolution);

// LINK WEAKNESS TO POKEMON
app.post("/home/linkWknsToPoke", dbPost.linkWknsToPoke);

app.get("/home/element/:element", dbPokemon.pokemonLinkedElement);

// EDIT POKEMON
app.put(
  "/home/pokemon/:id/update?",
  upload.single("pokemonimg"),
  dbPost.updatePokemon
);

// LISTEN TO ROUTES
app.listen(5000);
