const router = require("express").Router();

const contactUs = require("./contactUsRoutes");
const admin = require("./adminRoutes");


router.use("/contactUs", contactUs);
router.use("/admin", admin);

module.exports = router;