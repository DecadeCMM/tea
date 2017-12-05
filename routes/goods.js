const express = require('express');
const router = express.Router();
const Goods = require('../models/goods'); // 引入model
const articleList = require('../models/article_list')

router.get('/show',(req,res)=>{
	Goods.findById(req.query.id)
		.then(model=>{
			res.render('goods/show',{
				model
			})
		})
});
router.get('/showArticle',(req,res)=>{
	articleList
	.findById(req.query.id)
		.then(model=>{
			res.render('goods/show',{
				model
			})
		})
});

module.exports = router;