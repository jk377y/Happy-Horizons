const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const navRoutes = require("./navigate");

router.use("/", homeRoutes);
router.use("/navigate", navRoutes);

module.exports = router;
