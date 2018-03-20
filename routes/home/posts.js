var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')

/* GET home page. */
router.get('/', function(req, res, next) {
	// 获取id
	var id = req.query.id;
    article.findOne({_id: id},(err,data) => {
        res.render('home/article',{data:data});
    })

});

module.exports = router;