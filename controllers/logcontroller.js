const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validate-session"); //makes sure you "own" your data, must have token to use
const Log = require("../db").import("../models/log");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey! This is a practice route!");
});

//* **CREATE LOG** *//
router.post("/", validateSession, (req, res) => {
  const logEntry = {
    date: req.body.log.date,
    location: req.body.log.location,
    trailName: req.body.log.trailName,
    totalTrailLength: req.body.log.totalTrailLength,
    totalMilesHiked: req.body.log.totalMilesHiked,
    conditions: req.body.log.conditions,
    foodConsumed: req.body.log.foodConsumed,
    waterConsumed: req.body.log.waterConsumed,
    description: req.body.log.description,
    owner: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//* **GET ALL ENTRIES** *//
router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: { owner: userid },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//* **GET ENTRIES BY USER** *//
router.get("/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: { owner: userid },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err.message }));
}); //LOLZ you can only pull the logs of the person that you're logged into

//* **UPDATE** *//
router.put("/update/:id", validateSession, function (req, res) {
  const updateLog = {
    date: req.body.log.date,
    location: req.body.log.location,
    trailName: req.body.log.trailName,
    totalTrailLength: req.body.log.totalTrailLength,
    totalMilesHiked: req.body.log.totalMilesHiked,
    conditions: req.body.log.conditions,
    foodConsumed: req.body.log.foodConsumed,
    waterConsumed: req.body.log.waterConsumed,
    description: req.body.log.description,
    owner: req.user.id,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } }; //goes by owner, then looks into the id (row of the table)
  //you can only pull however many rows per user there are
  Log.update(updateLog, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//* **DELETE** *//
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
