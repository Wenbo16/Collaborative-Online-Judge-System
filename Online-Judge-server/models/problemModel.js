var mongoose = require('mongoose');

var ProblemSchema = mongoose.Schema({
	id: Number,
	name: String,
	desc: String,
	difficulty: String,
	posts:  [{
				postId: Number,
				title: String,
				postTime: Date,
				userName: String,
				userId: Number,
				readTimes: Number,
				commentTimes: Number,
				linkedTimes: Boolean
			}] 
});



var ProblemModel = mongoose.model('ProblemModel', ProblemSchema);
// var ProblemModel = mongoose.model;


module.exports = ProblemModel;