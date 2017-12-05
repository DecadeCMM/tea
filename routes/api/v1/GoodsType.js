const express = require('express')
const router = express.Router();
const GoodsType = require('../../../models/goods_type')
const utils = require('../../../tools/utils')
// 获取分类
router.get('/',(req,res)=>{
	
	GoodsType.find().select('name')
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})
module.exports = router;