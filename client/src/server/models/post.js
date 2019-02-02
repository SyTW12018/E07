let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;
let PostSchema = new Schema({
	body: {
		type: String
	},
	createAt: Number,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		refPath: 'onModel'
	},
	onModel: {
		type: String,
		required: true,
	}

});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
