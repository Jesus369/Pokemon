const models = require("../models");

allUsers = (req, res, next) => {
  models.users.findAll().then(users => {
    res.send(users);
  });
};

userPage = async (req, res, next) => {
  let foundUser = await models.users.findOne({
    where: {
      id: req.session.userId
    },
    attributes: ["id", "username", "firstname", "hometown", "age"],
    include: [
      {
        model: models.pokemon,
        attributes: ["id", "name", "image"],
        as: "userssix"
      },
      {
        model: models.pokemon,
        attributes: ["id", "name", "image"]
      }
    ]
  });

  if (!foundUser) {
    res.redirect("/home");
  } else {
    res.render("showuser", {
      user: foundUser,
      username: req.session.username,
      userid: req.session.userId
    });
  }
};

updateUser = async (req, res, next) => {
  const foundUser = await models.users.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!foundUser) {
    res.redirect("/home");
  } else {
    res.render("traineredit", {
      user: foundUser,
      username: req.session.username,
      userId: req.session.userId
    });
  }
};

userLogout = (req, res, next) => {
  req.session.destroy(err => {});
  res.redirect("/home");
};

reampTeam = async (req, res, next) => {
  const foundUserNPokemon = await models.users.findOne({
    where: { id: req.session.userId },
    attributes: ["id"],
    include: [
      {
        model: models.pokemon,
        attributes: ["id", "name", "image"]
      },
      {
        model: models.pokemon,
        as: "userssix",
        attributes: ["id", "name", "image"]
      }
    ]
  });

  res.json(foundUserNPokemon);
};

usersPokemon = async (req, res, next) => {
  const userspokemon = await models.pokemon.findAll({
    attributes: ["id", "name", "image"],
    include: [
      {
        model: models.users,
        where: { id: req.params.id },
        as: "userspokemon",
        attributes: ["id"]
      }
    ]
  });

  res.render("viewuserpokemon", {
    userspokemon: userspokemon,
    username: req.session.username,
    userId: req.session.userId
  });
};

jsonUserPokemon = (req, res, next) => {
  models.users
    .findAll({
      where: {
        id: req.session.userId
      },
      include: [
        {
          required: false,
          model: models.pokemon
        }
      ],
      raw: false
    })
    .then(user => {
      res.json({
        user: user
      });
    });
};

module.exports = {
  allUsers,
  userPage,
  usersPokemon,
  reampTeam,
  jsonUserPokemon,
  updateUser,
  userLogout
};
