const express = require("express");
const {details} = require("../controllers/user");

const router = express.Router();

router.get("/details" ,details);


module.exports = router;
