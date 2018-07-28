const pgp = require("pg-promise")(options);
const promise = require("bluebird");
const models = require("../models");

var connectString = "postgres://localhost:5432/pokemonapp";
var db = pgp(connectString);
var options = {
  promiseLib: promise
};

allPokemon = async (req, res, next) => {
  try {
    const element = await models.element.findAll({
      attributes: ["id", "element"],
      include: [
        {
          model: models.pokemon,
          attributes: ["id", "image", "name", "pokeid"],
          order: [["pokeid"]]
        }
      ]
    });

    res.render("home", {
      element: element,
      username: req.session.username,
      userId: req.session.userId
    });
  } catch (err) {}
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

pokemonLinkedElement = (req, res, next) => {
  models.element
    .findAll({
      attributes: ["element"],
      include: [
        {
          model: models.pokemon,
          attributes: ["name", "image", "pokeid", "id"],
          order: [["pokeid"]],
          include: [
            {
              model: models.element,
              where: { element: req.params.element }
            }
          ]
        }
      ]
    })
    .then(element => {
      res.render("pokemontype", {
        element: element,
        username: req.session.username,
        userId: req.session.userId
      });
    });
};

pokemonRoute = async (req, res, next) => {
  const allElements = await models.element.findAll({ attributes: ["element"] });
  const foundPokemon = await models.pokemon.findOne({
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
        model: models.element,
        attributes: ["eleimg", "element"],
        as: "wknsForPoke"
      },
      {
        model: models.pokemon,
        as: "Evolved",
        attributes: ["id", "name", "image"]
      }
    ],
    raw: false
  });

  res.render("showpokemon", {
    elements: allElements,
    pokemon: foundPokemon
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
  pokemonLinkedElement,
  pokemonRoute,
  jsonSinglePokemon,
  allJsonPokemon,
  createPokemon,
  updatePokemon
};
