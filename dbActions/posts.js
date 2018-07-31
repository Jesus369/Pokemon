registerUser = (req, res, next) => {
  const user = models.users.build({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });
  user.save().then(() => {
    res.redirect("/home/userlogin");
  });
};

updateUser = (req, res, next) => {
  models.users
    .update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        bio: req.body.bio,
        age: req.body.age,
        image: req.file.path,
        hometown: req.body.hometown
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(() => {
      res.redirect("/home");
    });
};

loginUser = (req, res, next) => {
  var user = models.users
    .findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    .then(user => {
      if (user.password == req.body.password) {
        req.session.username = req.body.username;
        req.session.userId = user.dataValues.id;
        req.session.authenticated = true;
        res.redirect("/home");
      } else {
        res.send("Login attempt failed");
      }
    });
};

createPokemon = (req, res, next) => {
  models.pokemon
    .create({
      pokeid: req.body.pokeid,
      name: req.body.name,
      type: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed,
      total: req.body.total,
      attackone: req.body.attackone,
      attacktwo: req.body.attacktwo,
      attackthree: req.body.attackthree,
      attackfour: req.body.attackfour,
      desc: req.body.desc,
      weakness: req.body.weakness,
      image: req.file.path
    })
    .then(pokemon => {
      res.redirect("/home");
    });
};

updatePokemon = (req, res, next) => {
  (req, res) => {
    models.pokemon
      .update(
        {
          pokeid: req.body.pokeid,
          name: req.body.name,
          desc: req.body.desc,
          type: req.body.type,
          hp: req.body.hp,
          attack: req.body.attack,
          defense: req.body.defense,
          spattack: req.body.spattack,
          spdefense: req.body.spdefense,
          speed: req.body.speed,
          total: req.body.total,
          attackone: req.body.attackone,
          attacktwo: req.body.attacktwo,
          attackthree: req.body.attackthree,
          attackfour: req.body.attackfour,
          desc: req.body.desc,
          weakness: req.body.weakness,
          image: req.file.path
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(() => {
        res.redirect("/home");
      });
  };
};

catchPokemon = (req, res, next) => {
  if (!req.session.username) {
    res.send("You aren't logged in");
  } else {
    models.usertopokemon
      .create({
        userid: req.session.userId,
        pokeid: req.params.id
      })
      .then(() => {
        res.redirect("/home/:id/showuserpokemon");
      });
  }
};

newEvolution = async (req, res, next) => {
  try {
    db
      .none("INSERT INTO evolution(poke, evo)" + "values(${poke}, ${evo})", {
        poke: req.body.poke,
        evo: req.body.evo
      })
      .then(poke => {
        res.json(poke);
      });
  } catch (err) {}
};

addElement = async (req, res, next) => {
  db
    .none(
      "INSERT into elements(eleimg, element)" + "values(${eleimg}, ${element})",
      {
        eleimg: req.file.path,
        element: req.body.element
      }
    )
    .then(element => {
      res.json(element);
    });
};

linkEleToPoke = (req, res, next) => {
  db
    .none(
      "INSERT INTO eletopokemons (pokeid, eleid)" + "values(${poke}, ${ele})",
      {
        poke: req.body.poke,
        ele: req.body.ele
      }
    )
    .then(elepoke => {
      res.json(elepoke);
    });
};

linkWknsToPoke = (req, res, next) => {
  db
    .none(
      "INSERT INTO wknstopokemons (pwfid, wknsid)" +
        "VALUES (${pwfid}, ${wknsid})",
      {
        pwfid: req.body.pwfid,
        wknsid: req.body.wknsid
      }
    )
    .then(link => {
      res.json(link);
    });
};

module.exports = {
  registerUser,
  updateUser,
  loginUser,
  createPokemon,
  updatePokemon,
  catchPokemon,
  newEvolution,
  addElement,
  linkEleToPoke,
  linkWknsToPoke
};
