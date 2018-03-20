var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')
var cat = require('../../database/model/cat')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 连接数据库，获取数据
  //   monogoClient.connect(DB_STR,function (err, db) {
  //       if (err){
  //           res.send(err)
  //           return;
  //       }
  //       // 获取文章集合 posts
  //       var c = db.collection('posts');
  //       c.find().toArray(function (err, docs) {
  //           if (err){
  //               res.send(err)
  //               return;
  //           }
  //           // 同时获取分类的数据
  //           var c1 = db.collection('cats');
  //           c1.find().toArray(function (err, result){
  //               if (err){
  //                   res.send(err)
  //                   return;
  //               }
  //               res.render('home/index', { data: docs,data1:result });
  //           });
  //
  //       });
  //   })
    
    article.find((err,articles) => {
        console.log(articles)
        cat.find((error,cats) => {
            if(error){
                console.log(error)
            }
            res.render('home/index', {data: articles,data1: cats})
        })
    })

});

module.exports = router;
