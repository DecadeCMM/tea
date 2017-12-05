const express = require('express')
const router = express.Router();
const Goods = require('../../../models/goods')
const utils = require('../../../tools/utils');
// 根据商品id找
router.get('/:pDid',(req,res)=>{
	console.log(req.params.pDid)
	Goods.findById(req.params.pDid)
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})

module.exports = router