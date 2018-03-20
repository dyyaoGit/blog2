var express = require('express');
var router = express.Router();
var users = require('../../database/model/user')

// 载入登录页面
router.get('/', function(req, res, next) {
  // 载入登录页面
    res.render('admin/login')
});

// 用户登录处理
router.post('/signin',function (req, res) {
    // 获取用户名和密码
    var username = req.body.username;
    var pwd = req.body.pwd;
    // 得到用户名和密码后，需要给数据库中的用户名和密码比较
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if (err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("users");
    //     c.find({username:username,pwd:pwd}).toArray(function (err, docs) {
    //         if (err){
    //             res.send(err)
    //             return;
    //         }
    //         if (docs.length){
    //             // 登录成功了
    //             req.session.isLogin = true;
    //             res.redirect('/admin/index')
    //         }else{
    //             // 登录失败了
    //             res.redirect('/admin/users')
    //         }
    //     })
    // });
    users.findOne({username: username},(err,data) => {
        console.log(data)
        if(data.pwd == pwd){
            req.session.username = username;
            res.redirect('/admin/index')
        }
        else{
            res.send('<h1>用户名密码错误</h1>')
        }
    })

});

// 用户注销操作
router.get('/logout',function (req, res) {
    // 清除session， 然后跳转就OK了
    req.session.username = null;
    res.redirect('/admin/users')
});

function checkNotLogin(req,res,next){
	if(req.session.isLogin){
		// 表示已经登录了，跳转到原先页面
		res.redirect('back');
	}
	next();
}



module.exports = router;

















