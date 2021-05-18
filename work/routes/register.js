var express = require('express');
var router = express.Router();
// var mysql =require('mysql');

// connection.connect();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});
// router.post('/add', function(req, res, next) {
//   var date=new Date();
//   var nowdate=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
//   var  addSql = 'INSERT INTO Users(userzhanghao,username,userphonenumber,usereamil,userjoindate) VALUES(?,?,?,?,?)';
//   var  addSqlParams = [req.body.Userzhanghao,req.body.Userphonenumber,req.body.Useremail,req.body.Userpaseword,nowdate];
//   connection.query(addSql,addSqlParams,function(err,result,fields){
//     if(err) throw err;
//     console.log('添加了一个新用户')
// //   })
// })

module.exports = router;
