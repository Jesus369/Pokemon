require("dotenv").config();
const methodOverride = require("method-override"),
  expressValidator = require("express-validator"),
  models = require("./models"),
  mustacheExpress = require("mustache-express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  pgp = require("pg-promise")(options),
  promise = require("bluebird"),
  express = require("express"),
  multer = require("multer"),
  path = require("path"),
  app = express(),
  dbUser = require("./dbActions/userQueries"),
  dbPokemon = require("./dbActions/pokemonQueries"),
  dbPost = require("./dbActions/posts"),
  Sequelize = require("sequelize"),
  pg = require("pg"),
  { Pool } = require("pg"),
  SessionStore = require("connect-session-sequelize")(session.Store),
  bcrypt = require("bcrypt");

app
  .use("/public/script", express.static("uploads/script"))
  .use("/upload_attributes", express.static("upload_attributes"))
  .use("/uploads", express.static("uploads"))
  .use("/public", express.static("public"))
  .use(methodOverride("_method"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(expressValidator())
  .engine("mustache", mustacheExpress())
  .set("view engine", "mustache")
  .set("views", "./views");

let connectString;

if (process.env.LOCAL_URL) {
  connectString = process.env.LOCAL_URL;
} else {
  connectString = process.env.HOST_URL;
}

var options = {
  // bluebird
  promiseLib: promise
};

const db = pgp(connectString);

const pool = new Pool({
  connectionString: connectString
});

var env = process.env.NODE_ENV || `development`;
var config = require(`./config/config.json`)[env];
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env.HOST_URL);
}

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard-cat"
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

// SHOW USER'S POKEMON TEAM
app.get("/home/:id/trainers-six", (req, res) => {
  res.render("trainersix");
});

app.get("/home/:id/remove-from-team", dbUser.reampTeam);

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
app.post("/home/pokemon-captured/:id", dbPost.catchPokemon);

app.post("/home/:id/new-teammate", dbPost.addToSix);

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports.bcrypt = bcrypt;
