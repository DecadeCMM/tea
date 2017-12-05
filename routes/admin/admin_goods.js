const express = require('express');
const router = express.Router();
const utils = require('../../tools/utils');
const Goods = require('../../models/goods'); // 引入model
const GoodsType = require('../../models/goods_type');

router.get('/',(req,res)=>{
	let page = 1; // 当前页码
	if(req.query.page){
		page = Number(req.query.page);
	}
	const queryCount = Goods.count();
	const queryData = Goods.find().sort({_id:-1}).populate('goods_type') // 数据查找
											.limit(global.pageSize).skip((page-1)*global.pageSize);
	const pAll = Promise.all([queryCount,queryData])
	pAll.then(([allCount,data])=>{
		const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
		// console.log(pageCount);
		const arrPages = utils.getPagesArr(page,pageCount); // 总页数
		res.render('admin/goods/index',{
			list:data,
			pages:arrPages, //页面中显示的分页页码
			pageCount, //总页数
			pageIndex:page, //当前页码
		});
	})
})
router.get('/add',(req,res)=>{
	const model = new Goods();
	// 在商品编辑的时候把分类数据显示在商品页面上
	GoodsType.find()
		.then(types=>{
			res.render('admin/goods/add',{
				types,
				model,
				isEditor: false
			});
		})
})
router.post('/add',(req,res)=>{
	var model = new Goods(req.body);
	model.save()
		.then(data=>{
			console.log(data);
			// res.send('保存成功')
			res.redirect('/admin/goods'); // 页面重定向
		})
		.catch(err=>{
			console.log(err);
			res.send(err);
		})
});

// 编辑
router.get('/editor',(req,res)=>{
	const queryData = Goods.findByIdAndUpdate(req.query.id,req.body);
	const queryTypes = GoodsType.find();
	const qAll = Promise.all([queryTypes,queryData])
		.then(([types,model])=>{
			res.render('admin/goods/add',{
				types,
				model,
				isEditor: true
			});
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/editor/:id',(req,res)=>{
	Goods.findByIdAndUpdate(req.params.id,req.body)
		.then(data=>{
			res.redirect('/admin/goods');
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/delete',(req,res)=>{
	if(req.body.id){
		Goods.findByIdAndRemove(req.body.id)
			.then(data=>{
				console.log(data);
				res.redirect('/admin/goods');
			})
	}
	else{
		res.send('请选择要删除的id');
	}
});

module.exports = router;