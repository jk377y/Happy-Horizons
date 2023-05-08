require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("./config/connection");
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;
const app = express();
const sessionStore = new MongoStore({
	mongooseConnection: db,
	collection: "sessions",
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// localhost:5000/  (GET)
app.get("/", (req, res, next) => {
	if (req.session.viewCount) {
		req.session.viewCount++;
	} else {
		req.session.viewCount = 1;
	}
	console.log(req.session);
	res.send(`<h1>You have visited this page ${req.session.viewCount}</h1>`);
});

// app.listen(PORT);

db.once("open", () => {
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
