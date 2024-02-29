const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Market }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Market, { foreignKey: 'marketId' });
    }
  }
  ApiKey.init(
    {
      apiKey: DataTypes.STRING,
      apiSecret: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      marketId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ApiKey',
    },
  );
  return ApiKey;
};
