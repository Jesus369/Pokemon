const models = require("../models");

allPokemon = async (req, res, next) => {
  const element = await models.element.findAll({
    attributes: ["id", "element"]
  });

  const allPokemons = await models.pokemon.findAll({
    attributes: ["id", "image", "name"],
    order: [["pokeid"]]
  });

  res.render("home", {
    element: element,
    allPokemons: allPokemons,
    username: req.session.username,
    userId: req.session.userId
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

pokemonLinkedElement = async (req, res, next) => {
  const allElements = await models.element.findAll({ attributes: ["element"] });

  const pokemons = await models.pokemon.findAll({
    attributes: ["image", "name", "id", "pokeid"],
    order: [["pokeid"]],
    include: [
      {
        model: models.element,
        where: { element: req.params.element }
      }
    ]
  });

  res.render("pokemontype", {
    pokemons: pokemons,
    allElements: allElements,
    username: req.session.username,
    userId: req.session.userId
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
        attributes: ["id", "eleimg"]
      },
      {
        model: models.element,
        attributes: ["eleimg"],
        as: "wknsForPoke"
      },
      {
        model: models.pokemon,
        as: "Evolved",
        attributes: ["id", "name", "image", "desc"],
        order: [["pokeid"]]
      }
    ],
    raw: false
  });

  res.render("showpokemon", {
    allElements: allElements,
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
