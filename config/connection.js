const mongoose = require("mongoose");
mongoose.set("debug", false);
mongoose.set("strictQuery", true);

const dbName = "happy_horizons_db";
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${dbName}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose.connection;
