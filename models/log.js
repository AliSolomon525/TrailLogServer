module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("log", {
    //user is table name
    date: {
      //what type of column is this? you want a string. email is the name of the column
      type: DataTypes.STRING,
      allowNull: false, //won't allow null
    },
    trailName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalTrailLength: {
      type: DataTypes.INTEGER,
    },
    totalMilesHiked: {
      type: DataTypes.INTEGER,
    },
    conditions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    water: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
    },
  });
  return Log; //returning what we created
};
