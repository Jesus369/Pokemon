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
    as: "userssix",
    attributes: ["id", "firstname", "hometown", "age"],
    include: [
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

updateUser = (req, res, next) => {
  models.users
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.render("traineredit", {
        user: user,
        username: req.session.username,
        userId: req.session.userId
      });
    });
};

userLogout = (req, res, next) => {
  req.session.destroy(err => {});
  res.redirect("/home");
};

getTeamSix = (req, res, next) => {
  models.pokemon.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: "users",
        where: {
          iduser: req.session.userId
        }
      }
    ]
  });
};

usersPokemon = (req, res, next) => {
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
      res.render("viewuserpokemon", {
        user: user,
        username: req.session.username,
        userId: req.session.userId
      });
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
  jsonUserPokemon,
  updateUser,
  userLogout
};
