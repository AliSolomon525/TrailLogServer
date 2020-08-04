const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "blue-badge-server", //name of the database, no name? it can't connect
  "postgres", //type of database
  "pw", //password for your database
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to express-server postgres database!");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
