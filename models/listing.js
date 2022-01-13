'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Listing.belongsTo(models.User)
      Listing.belongsTo(models.Book)
    }
  };
  Listing.init({
    own: DataTypes.BOOLEAN,
    condition: DataTypes.INTEGER,
    frontUrl: DataTypes.TEXT,
    backUrl: DataTypes.TEXT,
    spineUrl: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};