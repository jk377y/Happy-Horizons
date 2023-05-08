const router = require("express").Router();

// for test
router.get('/', (req, res) => {
	res.send('<h1>localhost:5000/navigate/login</h1');
});

router.post("/", (req, res) => {
	User.findOne({
		where: { email: req.body.email },
	}).then((dbUserData) => {
		if (!dbUserData) {
			res.status(400).json({ message: "That email is not registered!" });
			return;
		}
		const validPassword = dbUserData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect password!" });
			return;
		}
		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;
			res.json({ user: dbUserData, message: "You are now logged in!" });
		});
	});
});

module.exports = router;