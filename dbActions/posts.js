const bcrypt = require("bcrypt");
const models = require("../models");

let connectString;
if (process.env.LOCAL_URL) {
  connectString = process.env.LOCAL_URL;
} else {
  connectString = process.env.HOST_URL;
}
const pgp = require("pg-promise")(options);
const promise = require("bluebird");
var db = pgp(connectString);

var options = {
  promiseLib: promise
};

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

loginUser = async (req, res, next) => {
  let user = await models.users.findOne({
    where: {
      username: req.body.username
    }
  });

  let valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    res.send("Login attempt failed");
  } else {
    req.session.username = req.body.username;
    req.session.userId = user.id;
    req.session.authenticated = true;
    res.redirect("/home");
  }
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

addToSix = async (req, res, next) => {
  let usersPokemon = models.pokemon.findAll({
    attributes: ["name"],
    include: [
      {
        model: models.users,
        as: "userssix",
        where: { id: req.session.userId },
        attributes: ["firstname"]
      }
    ]
  });
  const [pokemons] = await Promise.all([usersPokemon]);
  let activeTeam = [];
  pokemons.map(item => {
    let items = item.dataValues.name;
    activeTeam.push(item);
    return activeTeam;
  });
  console.log(activeTeam.length);
  if (activeTeam.length !== 6) {
    db
      .none(
        "INSERT INTO currentsixes (idpoke, iduser)" +
          "VALUES (${idpoke}, ${iduser})",
        {
          idpoke: req.body.idpoke,
          iduser: req.session.userId
        }
      )
      .then(newPokemon => {
        res.json(newPokemon);
      });
  } else {
    res.redirect("/");
  }
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
  addToSix,
  newEvolution,
  addElement,
  linkEleToPoke,
  linkWknsToPoke
};
