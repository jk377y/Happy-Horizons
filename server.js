require("dotenv").config();
const express = require("express");
const routes = require("./controllers");
const mongoose = require("mongoose");
mongoose.set("debug", false);
mongoose.set("strictQuery", true);
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const PORT = process.env.PORT || 3000;
const Handlebars = require('handlebars');
const sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
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
Handlebars.registerHelper("formatDate", function (date) {
	const options = { month: "2-digit", day: "2-digit", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

const dbName = "happy_horizons_db";
const connection = mongoose
	.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${dbName}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB successfully!");
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = connection;
