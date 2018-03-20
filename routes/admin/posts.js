var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')
var cats = require('../../database/model/cat')


// 显示文章列表
router.get('/', function(req, res, next) {
    // 获取文章
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if (err){
    //         res.send(err)
    //         return
    //     }
    //     var c = db.collection('posts');
    //     c.find().toArray(function (err, docs) {
    //         if (err){
    //             res.send(err)
    //             return
    //         }
    //         res.render('admin/article_list',{data:docs});
    //     });
    // });
    article.find((err,data) => {
        res.render('admin/article_list',{data:data});
    })

});

// 显示添加文章列表
router.get('/add', function(req, res, next) {
    // monogoClient.connect(DB_STR,function (err, db) {
    //     if(err){
    //         res.send(err)
    //         return;
    //     }
    //     var c = db.collection("cats");
    //     c.find().toArray(function (err,docs) {
    //         if(err){
    //             res.send(err)
    //             return;
    //         }
    //         res.render('admin/article_add',{data:docs});
    //     })
    // })

    cats.find((err,data) => {
        res.render('admin/article_add',{data:data});
    })

});

// 完成具体添加文章的功能
router.post('/add',function (req, res) {
    // 获取表单提交的数据
    var cat = req.body.cat;
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    // 发布文章的时间
    var time = new Date();

    var post = {
        "cat":cat,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    }
    monogoClient.connect(DB_STR,function (err, db) {
        if(err){
            res.send(err)
            return;
        }
        var c = db.collection("posts");
        c.insert(post,function (err, result) {
            if(err){
                res.send(err)
                return;
            }
            // 成功
            res.send('添加文章成功了 <a href="/admin/posts">查看文章列表</a>')
        })
    })

})

module.exports = router;














