var express = require('express');
var router = express.Router();
var mysql=require('mysql');
router.get('/',function(req,res,next){
    res.render('category')
})

router.get('/big',function(req,res,next){
    res.render('category-big')
})
router.get('/grid',function(req,res,next){
    res.render('category-grid')
})
router.get('/list',function(req,res,next){
    res.render('category-list')
})
module.exports = router;