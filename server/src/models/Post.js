const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	email: String,
	subject: String,
	message: String,
});

module.exports = mongoose.model("Post", schema);