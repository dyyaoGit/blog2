var express = require('express');
var router = express.Router();
var cats = require('../../database/model/cat')

// 显示分类列表
router.get('/', function(req, res, next) {
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("cats");
    //     c.find().toArray(function (err, docs) {
    //         if(err){
    //             res.send(err)
    //             return;
    //         }
    //         // 数据和视图一起进行渲染
    //         res.render('admin/category_list',{data:docs});
    //     });
    // })
    cats.find((err, data) => {
        res.render('admin/category_list',{data:data});
    })

});
// 显示添加分类
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
});
// 添加分类的具体实现
router.post('/add', function(req, res, next) {
    // 第一步，获取表单提交过来的数据
    var title = req.body.title;
    var sort = req.body.sort;
    //console.log(title,sort)
    // 第二步，验证提交过来的数据，省略
    // 第三步，将上面的数据保存到数据库，并完成提示并跳转
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if (err){
    //         res.send(err)
    //         return;
    //     }
    //     // 连接成功好，db就是myblog数据库
    //     // 获取cats集合
    //     var c = db.collection("cats");
    //     c.insert({title:title,sort:sort},function (err, result) {
    //         if (err){
    //             res.send(err)
    //         }else {
    //             // 插入数据成功了
    //             res.send("添加分类成功 <a href='/admin/cats'>查看分类列表</a>")
    //         }
    //     })
    // });
    cats.create({title,sort},err => {
        if(err){
            console.log(err)
        }
        else {
            res.send("添加分类成功 <a href='/admin/cats'>查看分类列表</a>")
        }
    })

});
// 显示编辑分类
router.get('/edit', function(req, res, next) {
    var id = req.query.id;
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("cats");
    //     c.find({_id:ObjectId(id)}).toArray(function (err, docs) {
    //         if(err){
    //             res.send(err)
    //             return;
    //         }
    //         console.log(docs)
    //         // 数据和视图一起进行渲染
    //         res.render('admin/category_edit',{data:docs[0]});
    //     });
    // })
    cats.findOne({_id:id},(err,data) => {
        res.render('admin/category_edit',{data:data});
    })
});
// 完成编辑分类的具体功能
router.post('/edit', function(req, res, next){
    // 1，获取表单中的数据
    var title = req.body.title;
    var sort = req.body.sort;
    var id = req.body.id;
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("cats");
    //     c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function (err, result) {
    //         if(err){
    //             res.send(err)
    //         }else{
    //             res.send("更新成功 <a href='/admin/cats'>返回分类列表</a>")
    //         }
    //     })
    // })
    cats.update({_id:id},{$set:{title,sort}},(err) => {
        if(err){
            res.send(err)
        }
        else {
            res.send("更新成功 <a href='/admin/cats'>返回分类列表</a>")
        }
    })
});

// 删除分类
router.get('/delete',function (req, res) {
    // 获取id
    var id = req.query.id;
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("cats");
    //     c.remove({_id:ObjectId(id)},function (err, result) {
    //         if(err){
    //             res.send(err)
    //             return;
    //         }
    //         res.redirect('/admin/cats')
    //     })
    // })
    cats.remove({_id: id},err => {
        res.redirect('/admin/cats')
    })
});

module.exports = router;
