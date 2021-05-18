var express = require('express');
var router = express.Router();
var mysql=require('mysql');
// var flash=require('flash');
class user{
  constructor(userzhanghao,username,userphonenumber,usereamil,userpassword,userjoindate){
    this.userzhanghao=userzhanghao;
    this.username=username;
    this.userphonenumber=userphonenumber;
    this.usereamil=usereamil;
    this.userpassword=userpassword;
    this.userjoindate=userjoindate;
  }

}
var user_obj=new Object;
user_obj.status=0;
  var connection=mysql.createConnection({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'123456',
  database:'mydatabase'
});

connection.connect();


var user_package=new Object();//传输给用户页面的用户信息封装包
var html_package=new Object();//传输给页面展示的信息封装包
/* GET home page. */
router.get('/',function(req,res,next){
  // if(req.session.users){//登录状态
  //   res.render('index');
  // }else{
  //   res.render('nologinindex');  
  // }
  res.render('nologinindex');
  // next();
})
router.get('/nologinindex',function(req,res,next){
  res.render('nologinindex')
})
// router.get('/register',function(req,res,next){
//   res.render('register');
// })

//注册页面添加代码
router.post('/add', function(req, res, next) {
//   var connection=mysql.createConnection({
//     host:'127.0.0.1',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'mydatabase'
//   });
  

  var date=new Date();
  var nowdate=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
  if(req.body.Userpaseword==null || req.body.Userphonenumber==null){}else{
  var  addSql = 'INSERT INTO Users(userzhanghao,username,userphonenumber,usereamil,userpassword,userjoindate) VALUES(?,?,?,?,?,?)';
  var  addSqlParams = [req.body.Userzhanghao,req.body.username,req.body.Userphonenumber,req.body.Useremail,req.body.Userpaseword,nowdate];
  connection.query(addSql,addSqlParams,function(err,result,fields){
    if(err) throw err;
    console.log('添加了一个新用户')
    res.redirect('/');
  })}
  // connection.end();//结束连接
})
//登录页面
router.get('/login', function(req, res, next) {
  res.render('login');
})
router.post('/loginstatus', function(req, res, next) {
    res.json(req.session.users);
})
router.post('/login', function(req, res, next) {

  

  var usernumber=req.body.User_zhanghao;
  var userpaseword=req.body.User_paseword;
  const users="select * from Users where userzhanghao=? or usereamil=? or userphonenumber=?"
  console.log('userzhanghao:'+usernumber);
  console.log('userpaseword:'+userpaseword);


        // 账号判断
        connection.query(users,[usernumber,usernumber,usernumber],function(err,result,fields){
          console.log("result:"+result+isNaN(result));
          if(err){ throw err;console.log('查询错误')}
          if(isNaN(result)){
            
            if(result[0].userpassword==userpaseword){
              // req.session.user=new user(result.userzhanghao,result.username,result.userphonenumber,result.usereamil,result.userpassword,result.userjoindate)
              res.redirect('index');//密码正确,通向show的路由
            }else{
              user_obj.status=0;
              console.log('密码错误');
              res.render('error',{erroor:'密码错误!将三秒后跳转回主页面'})
              // res.send('密码错误!将三秒后跳转回主页面');
              // setTimeout(function(){
              //   res.redirect('/');
              // },3000)

            }
          }else{
            user_obj.status=0;
            console.log('没有此账号');
            res.render('error',{erroor:'查无此账号!将三秒后跳转回主页面'})
             
            // res.send("查无此账号!将三秒后跳转回主页面");
            // req.flash(err,"查无此账号!将三秒后跳转回主页面");
            // setTimeout(function(){
            //   res.redirect('/');
            // },3000)//解决这个发送错误后跳转,就要去看req.flash()方法
        // 密码判断
        
      }
        
      })
      // connection.end();//结束连接
        
});
//展示页面
router.get('/index', function(req, res, next) {
  res.render('index');
})

module.exports = router;
/*
用户:用户id,用户昵称,用户姓名,用户号码,用户邮箱,用户密码,会员情况,角色(用户,管理员)...
博客内容:博客内容id,用户id,文章内容
博客分类:博客内容id,博客社区分类
社区分类:社区类型id,社区类型名称
*/ 