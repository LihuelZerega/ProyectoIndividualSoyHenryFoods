const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthscore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://www.clarin.com/img/2022/05/27/0HXb0UR0v_2000x1500__1.jpg',
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {
    timestamps: false,
  });
};