const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Market }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Market, { foreignKey: 'market_id' });
    }
  }
  ApiKey.init(
    {
      api_key: DataTypes.STRING,
      api_secret: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      market_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ApiKey',
    },
  );
  return ApiKey;
};
