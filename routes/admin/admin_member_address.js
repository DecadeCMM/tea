const express = require('express');
const router = express.Router();

const MemberAddress = require('../../models/member_address'); // 引入model

router.get('/list/:id',(req,res)=>{
	const queryData = MemberAddress.find({m_id:req.params.id}).sort({_id:-1}) // 数据查找
	queryData.then(data=>{
		res.render('admin/member_address/index',{
			list:data,
			m_id:req.params.id // 用户id
		});
	})
})
router.get('/add/:m_id',(req,res)=>{
	const model = new MemberAddress();
	let p ='';
	let c = '';
	let a = '';
	res.render('admin/member_address/add',{
		model,
		isEditor: false,
		p,c,a
	});
})
router.post('/add/:m_id',(req,res)=>{
	var model = new MemberAddress({
		m_id:req.params.m_id,
		address: req.body.Province+'-'+req.body.City+'-'+req.body.Area,
		address_detail: req.body.address_detail,
		is_default: req.body.is_default
	});
	model.save()
		.then(data=>{
			console.log(data);
			// res.send('保存成功')
			res.redirect('/admin/member_address/list/'+req.params.m_id); // 页面重定向
		})
		.catch(err=>{
			console.log(err);
			res.send(err);
		})
});

// 编辑
router.get('/editor',(req,res)=>{
	const queryData = MemberAddress.findById(req.query.id);
	queryData.then(model=>{
			let p ='';
			let c = '';
			let a = '';
			try{
				p = model.address.split('-')[0]
				c = model.address.split('-')[1]
				a = model.address.split('-')[2]
			}
			catch(err){
			}
			res.render('admin/member_address/add',{
				model,
				isEditor: true,
				p,c,a
			});
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/editor/:id',(req,res)=>{
	// console.log('修改.....')
	var reqData = {
		address: req.body.Province+'-'+req.body.City+'-'+req.body.Area,
		address_detail: req.body.address_detail,
		is_default: req.body.is_default
	};
	MemberAddress.findByIdAndUpdate(req.params.id,reqData)
		.then(data=>{
			res.redirect('/admin/member_address/list/'+data.m_id);
		})
		.catch(err=>{
			res.send(err);
		})
});

router.post('/delete',(req,res)=>{
	if(req.body.id){
		MemberAddress.findByIdAndRemove(req.body.id)
			.then(data=>{
				console.log(data);
				res.redirect('/admin/member_address/list/'+data.m_id);
			})
	}
	else{
		res.send('请选择要删除的id');
	}
});


module.exports = router;