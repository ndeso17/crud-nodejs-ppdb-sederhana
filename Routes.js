const express = require("express");
const router = express.Router();
const app = require("./Controllers/app");

router.get("/", app.index);
router.get("/ppdb", app.ppdb);
router.post("/ppdb", app.ppdb);
router.get("/dashboard", app.dashboard);
router.delete("/dashboard/delete", app.deleteSis);
router.put("/dashboard/update", app.updateSis);

module.exports = router;
