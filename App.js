require("dotenv").config();
let express = require("express");
const app = express();
const sequelize = require("./db");

let log = require("./controllers/logcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();

app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/api/user", user);
app.use("/api/log", log);

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
