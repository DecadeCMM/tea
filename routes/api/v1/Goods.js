const express = require('express')
const router = express.Router();
const Goods = require('../../../models/goods')
const utils = require('../../../tools/utils');
// 获取全部
router.get('/',(req,res)=>{
	Goods.find()
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})

router.get('/:id',(req,res)=>{
	Goods.find({goods_type:req.params.id})
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})
// 根据分类id找商品
router.get('/:id',(req,res)=>{
	console.log(req.params.pDid)
	Goods.find({goods_type:req.params.id})
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})


module.exports = router;