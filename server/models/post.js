let mongoose = require('mongoose');
let PostSchema = new mongoose.Schema({
	body: {
		type: String,
		minlength: 10,
		maxlength: 260
	},
	createAt: Date ,
	postType: {
		required: true,
		type: String
	 },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref:"User"
	}
});
		
module.exports = mongoose.model("Post", PostSchema);
