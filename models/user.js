module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    //user is table name
    username: {
      //what type of column is this? you want a string. email is the name of the column
      type: DataTypes.STRING,
      allowNull: false, //won't allow null
      unique: true,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User; //returning what we created
};
