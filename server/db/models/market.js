const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ApiKey }) {
      this.hasMany(ApiKey, { foreignKey: 'marketId' });
    }
  }
  Market.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Market',
    },
  );
  return Market;
};
