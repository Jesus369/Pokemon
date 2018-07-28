("use strict");
module.exports = (sequelize, DataTypes) => {
  var element = sequelize.define(
    "element",
    {
      element: DataTypes.STRING,
      eleimg: DataTypes.STRING
    },
    {}
  );

  element.associate = models => {
    element.belongsToMany(models.pokemon, {
      through: "eletopokemons",
      foreignKey: "eleid"
    });

    element.belongsToMany(models.pokemon, {
      through: "wknstopokemons",
      foreignKey: "wknsid",
      as: "wknsToPoke"
    });
  };
  return element;
};
