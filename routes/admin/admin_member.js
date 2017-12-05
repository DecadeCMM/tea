const express = require('express');
const router = express.Router();

const Member = require('../../models/member'); // 引入model
const utils = require('../../tools/utils');

router.get('/',(req,res)=>{
	let page = 1; // 当前页码
	if(req.query.page){
		page = Number(req.query.page);
	}
	const queryCount = Member.count();
	const queryData = Member.find().sort({_id:-1}) // 数据查找
											.limit(global.pageSize).skip((page-1)*global.pageSize);
	const pAll = Promise.all([queryCount,queryData])
	pAll.then(([allCount,data])=>{
		const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
		// console.log(pageCount);
		const arrPages = utils.getPagesArr(page,pageCount); // 总页数
		res.render('admin/member/index',{
			list:data,
			pages:arrPages, //页面中显示的分页页码
			pageCount, //总页数
			pageIndex:page, //当前页码
		});
	})
})
router.get('/add',(req,res)=>{
	const model = new Member();
	res.render('admin/member/add',{
		model,
		isEditor: false
	});
})
router.post('/add',(req,res)=>{
	var model = new Member(req.body);
	model.user_pwd = utils.md5(req.body.user_pwd);
	model.save()
		.then(data=>{
			console.log(data);
			// res.send('保存成功')
			res.redirect('/admin/member'); // 页面重定向
		})
		.catch(err=>{
			console.log(err);
			res.send(err);
		})
});

// 编辑
router.get('/editor',(req,res)=>{
	const queryData = Member.findByIdAndUpdate(req.query.id,req.body);
	queryData.then(model=>{
			res.render('admin/member/add',{
				model,
				isEditor: true
			});
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/editor/:id',(req,res)=>{
	Member.findByIdAndUpdate(req.params.id,req.body)
		.then(data=>{
			res.redirect('/admin/member');
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/delete',(req,res)=>{
	if(req.body.id){
		Member.findByIdAndRemove(req.body.id)
			.then(data=>{
				console.log(data);
				res.redirect('/admin/member');
			})
	}
	else{
		res.send('请选择要删除的id');
	}
});


module.exports = router;