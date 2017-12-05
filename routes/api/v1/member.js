const express = require('express');
const router = express.Router();
const Member = require('../../../models/member');

// 验证用户名是否存在
router.get('/',(req,res)=>{
	console.log(req.query.user_name)
	Member.count({user_name:req.query.user_name})
	.then(c=>{
		if(c==0){
				res.json({
					status:'y',
					mes:'保存成功'
				})
		}
		else{
			res.json({
				status:'n',
				mes:'用户名已存在'
			})
		}
	})
})
router.post('/save',(req,res)=>{
	console.log(req.body.user_name)
	new Member(req.body).save()
	.then(data=>{
		res.json({
			status:'y',
			msg:'保存成功'
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			status:'n',
			msg:'保存失败'
		})
	})
})

// 登录
router.post('/sign',(req,res)=>{
	// console.log(req.body.user_name)
	Member.count({user_name:req.body.user_name})
	.then(c=>{
		if(c==0){
			res.json({
				status:'n',
				msg:'用户名未注册'
			})
		}
		else{
			Member.find({user_name:req.body.user_name})
			.then(data=>{
				if((data[0].pass==req.body.pass) && (data[0].user_name==req.body.user_name)){
					res.json({
						status:'y',
						msg:'登录成功'
					})
				}else{
					res.json({
						status:'n',
						msg:'用户名或密码错误'
					})
				}
			})
			.catch(err=>{
				console.log(err)
				res.json({
					status:'n',
					msg:'登录失败'
				})
			})
		}
	})

})



module.exports = router;