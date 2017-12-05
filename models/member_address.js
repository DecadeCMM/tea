/**
 * address					省市区县
 * address_detail		详情
 * is_default				是否默认值
 * m_id							关联的用户id
 */
const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const memberAddressSchema = new Schema({
	address: {
		type: String,
		default: '',
	},
	address_detail: {
		type: String,
		default: '',
	},
	is_default: {
		type: Number,
		default: 0,
	},
	m_id: {
		type: Schema.Types.ObjectId,
		ref: 'member',
	}
});
const MemberAddress = mongoose.model('member_address',memberAddressSchema);
module.exports = MemberAddress;