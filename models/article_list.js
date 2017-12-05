// 列信息
const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const articleListSchema = new Schema({
	order: {
		type: Number,
		default: 1,
	},
	title: {
		type: String,
		default: '',
	},
	author:{
		type: String,
		default:'admin',
	},
	img: {
		type: String,
		default: ''
	},
	visit: {
		type: Number,
		default: 0,
	},
	content:{
		type:String,
		default:''
	},
	description:{
		type:String,
		default:''
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});
const articleList = mongoose.model('article_list',articleListSchema);
module.exports = articleList;