const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const navRoutes = require("./navigate");

router.use("/", homeRoutes);
router.use("/navigate", navRoutes);

module.exports = router;



//! for testing viewCount in session
// localhost:5000/  (GET)
// app.get("/", (req, res, next) => {
// 	if (req.session.viewCount) {
// 		req.session.viewCount++;
// 	} else {
// 		req.session.viewCount = 1;
// 	}
// 	console.log(req.session);
// 	res.send(`<h1>You have visited this page ${req.session.viewCount}</h1>`);
// });