const router = require("express").Router();

// for test
router.get('/', (req, res) => {
    res.send('<h1>localhost:5000/navigate/logout</h1');
});

// POST- used to logout
router.post('/', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	}
	else {
		res.status(404).end();
	}
});

module.exports = router;