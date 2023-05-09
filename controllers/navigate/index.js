const router = require("express").Router();

const contactUs = require("./contactUsRoutes");

router.use("/contactUs", contactUs);

module.exports = router;
