const express = require('express');
const router = express.Router();

const utils = require('../../tools/utils')
const GoodsType = require('../../models/goods_type'); // 引入model

router.get('/',(req,res)=>{
	console.log('123获取分类');
	let page = 1; // 当前页码
	if(req.query.page){
		page = Number(req.query.page);
	}
	const queryCount = GoodsType.count();
	const queryData = GoodsType.find().sort({_id:-1})
											.limit(global.pageSize).skip((page-1)*global.pageSize);
	const pAll = Promise.all([queryCount,queryData])
	pAll.then(([allCount,data])=>{
		const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
		// console.log(pageCount);
		const arrPages = utils.getPagesArr(page,pageCount); // 总页数
		res.render('admin/goods_type/index',{
			list:data,
			pages:arrPages, //页面中显示的分页页码
			pageCount, //总页数
			pageIndex:page, //当前页码
		//	moment, //格式化当前日期
		});
	})
})

router.get('/add',(req,res)=>{
	var model = new GoodsType();
	GoodsType.find()
		.then(types=>{
			res.render('admin/goods_type/add',{
				types,
				model,
				isEditor: false
			});
		})
})
router.post('/add',(req,res)=>{
	var model = new GoodsType(req.body);
	model.save()
		.then(data=>{
			console.log(data);
			// res.send('保存成功')
			res.redirect('/admin/goods_type'); // 页面重定向
		})
		.catch(err=>{
			console.log(err);
			res.send(err);
		})
});

// 编辑
router.get('/editor',(req,res)=>{
	const queryData = GoodsType.findByIdAndUpdate(req.query.id,req.body);
	const queryTypes = GoodsType.find();
	const qAll = Promise.all([queryTypes,queryData])
		.then(([types,model])=>{
			res.render('admin/goods_type/add',{
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
	GoodsType.findByIdAndUpdate(req.params.id,req.body)
		.then(data=>{
			res.redirect('/admin/goods_type');
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/delete',(req,res)=>{
	if(req.body.id){
		GoodsType.findByIdAndRemove(req.body.id)
			.then(data=>{
				console.log(data);
				res.redirect('/admin/goods_type');
			})
	}
	else{
		res.send('请选择要删除的id');
	}
});

module.exports = router;