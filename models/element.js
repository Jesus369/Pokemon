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
  };
  return element;
};
