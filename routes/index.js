const express = require("express");

const router = express.Router();

const controller = require("../controllers/controller");

router.get("/", controller.dashboard);
router.get("/add", controller.addPage);
router.get("/description/id=:id", controller.description);
router.get("/addBug/:id", controller.addBugPage);

router.post("/add", controller.add);
router.post("/addBug/:id", controller.addBug);
router.post("/description/id=:id/title", controller.title);
router.post("/description/id=:id/author", controller.author);
router.post("/description/id=:id/label", controller.label);

module.exports = router;
