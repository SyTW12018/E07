var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
	body: {
		type: String,
		minlength: 10,
		maxlength: 260
	},
	createAt: Date ,
	postType:{
		required: true,
		type: String
	 },
	_id: {
		type:String,
		default:id.generate()
	},
	creator: {
		type:ObjectId,
		ref:"User"
	}
});
		
module.exports = mongoose.model("Post", PostSchema);
