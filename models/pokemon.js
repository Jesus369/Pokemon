("use strict");
module.exports = (sequelize, DataTypes) => {
  var pokemon = sequelize.define(
    "pokemon",
    {
      pokeid: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      hp: DataTypes.INTEGER,
      attack: DataTypes.INTEGER,
      defense: DataTypes.INTEGER,
      spattack: DataTypes.INTEGER,
      spdefense: DataTypes.INTEGER,
      speed: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      attackone: DataTypes.STRING,
      attacktwo: DataTypes.STRING,
      attackthree: DataTypes.STRING,
      attackfour: DataTypes.STRING,
      desc: DataTypes.STRING,
      weakness: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );

  pokemon.associate = models => {
    // 6 Pokemon belonging to user's team

    pokemon.belongsToMany(models.users, {
      through: "usertopokemon",
      foreignKey: "pokeid",
      as: "userspokemon"
    });

    pokemon.belongsToMany(models.users, {
      through: "currentsix",
      foreignKey: "idpoke"
    });

    // Due to PGSQL, when querying "evo" foreignKey will belong to the active pokemon form
    pokemon.belongsToMany(models.pokemon, {
      through: "evolution",
      foreignKey: "evo",
      as: "Current"
    });

    // Due to PGSQL, "poke" foreignKey will belong to the evolutions of a pokemon
    pokemon.belongsToMany(models.pokemon, {
      through: "evolution",
      foreignKey: "poke",
      as: "Evolved"
    });

    // Pokemon's element
    pokemon.belongsToMany(models.element, {
      through: "eletopokemons",
      foreignKey: "pokeid"
    });

    // Pokemon's weakness element
    pokemon.belongsToMany(models.element, {
      through: "wknstopokemons",
      foreignKey: "pwfid",
      as: "wknsForPoke"
    });
  };

  return pokemon;
};
