allUsers = (req, res, next) => {
  models.users.findAll().then(users => {
    res.send(users);
  });
};

userPage = (req, res, next) => {
  models.users
    .findAll({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.render("showuser", {
        user: user,
        username: req.session.username,
        userid: req.session.userId
      });
    });
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
