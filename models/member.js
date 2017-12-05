/**
 * user_name				用户名
 * email						邮箱
 * mobile						手机号
 * name							名字
 * nick_name				昵称
 * user_pwd					密码
 * is_encryption		是否加密(默认加密)
 * img							头像
 * 	用户默认可以使用用户名、邮箱和手机号登陆
 * 	所以三者不能重复
 */
const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const memberSchema = new Schema({
	user_name: {
		type: String,
		default: '',
	},
	email: {
		type: String,
		default: '',
	},
	mobile: {
		type: String,
		default: '',
	},
	nick_name: {
		type: String,
		default: '',
	},
	pass: {
		type: String,
		default: '',
	},
	checkPass: {
		type: String,
		default: '',
	},
});
const Member = mongoose.model('member',memberSchema);
module.exports = Member;