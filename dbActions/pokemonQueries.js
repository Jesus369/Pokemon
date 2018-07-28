const pgp = require("pg-promise")(options);
const promise = require("bluebird");
const models = require("../models");

var connectString = "postgres://localhost:5432/pokemonapp";
var db = pgp(connectString);
var options = {
  promiseLib: promise
};

allPokemon = (req, res, next) => {
  models.pokemon
    .findAll({
      order: [["pokeid"]]
    })
    .then(pokemon => {
      res.render("home", {
        pokemon: pokemon,
        username: req.session.username,
        userId: req.session.userId
      });
    });
};

allJsonPokemon = (req, res, next) => {
  models.pokemon
    .findAll({
      order: [["pokeid"]]
    })
    .then(pokemon => {
      res.json({ pokemon: pokemon });
    });
};

pokemonRoute = async (req, res, next) => {
  models.pokemon
    .findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "name",
        "image",
        "desc",
        "hp",
        "attackone",
        "attacktwo",
        "attackthree",
        "attackfour",
        "spattack",
        "spdefense",
        "attack",
        "defense",
        "speed",
        "total"
      ],
      include: [
        {
          model: models.element,
          attributes: ["id", "element", "eleimg"]
        },
        {
          model: models.pokemon,
          as: "Evolved",
          attributes: ["id", "name", "image"]
        }
      ],
      raw: false
    })
    .then(pokemon => {
      res.render("showpokemon", {
        pokemon: pokemon,
        elements: pokemon.elements
      });
    });
};

jsonSinglePokemon = (req, res, next) => {
  models.pokemon
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(pokemon => {
      res.json({ pokemon: pokemon });
    });
};

createPokemon = (req, res, next) => {
  if (req.session.username != "Jesus222") {
    res.send("You are not authorized!");
  } else {
    res.render("createpokemon");
  }
};

updatePokemon = (req, res, next) => {
  if (req.session.username != "Jesus222") {
    res.redirect("/home");
  } else {
    models.pokemon.findAll({ where: { id: req.params.id } }).then(pokemon => {
      res.render("updatepokemon", {
        pokemon: pokemon,
        username: req.session.username,
        userId: req.session.userId
      });
    });
  }
};

module.exports = {
  allPokemon,
  pokemonRoute,
  jsonSinglePokemon,
  allJsonPokemon,
  createPokemon,
  updatePokemon
};
