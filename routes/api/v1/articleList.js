const express = require('express')
const router = express.Router();
const articleList = require('../../../models/article_list')
const utils = require('../../../tools/utils');
// 获取分类
router.get('/',(req,res)=>{
	articleList.find().select('title img created_at author visit description').limit(6)
		.then(data=>{
			res.json({
				status:'y',
				msg:'获取数据成功',
				data
			})
		})
})

// 获取详情页
router.get('/:id',(req,res)=>{
	console.log(req.params.id)
	articleList.findById(req.params.id)
	.then(data => {
		console.log(data.content)
		 res.json({
			 status:'y',
			 msg:'获取数据成功',
			 data
		 })
	})
})

module.exports = router;