const router = require("express").Router();

const loginRoutes = require("./loginRoutes");
const logoutRoutes = require("./logoutRoutes");

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);

router.get("/", (req, res) => {
	res.send("<h1>localhost:5000/navigate</h1");
});

module.exports = router;
