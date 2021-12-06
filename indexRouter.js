const express= require("express");
const router = express.Router();
const path =require("path");
const UserModel = require("./user")
const TodoModel = require("./ToDo")
const BlackListModel = require("./models/blackList")
const Checklogin = require("./checklogin.js")

var jwt = require('jsonwebtoken');
const { text } = require("express");

router.get('/kiemtracookies', async (req,res)=>{   
    try{
        //console.log(req.cookies.HID);
        //req:gửi về, res:gửi lên
        const check =await BlackListModel.findOne({token:req.cookies.NCT})
        if(check){
            res.json({status:400, mess:"Không hợp lệ"})
        }
        else{
        //console.log(36, req.cookies.id);
        var verify = jwt.verify(req.cookies.NCT, '123');
        //console.log(37, verify.id);
        let user = await UserModel.findOne({ _id:verify.id });
        if(user){
            res.json({status:200})
        }
        else{
            res.json({status:400})
        }
        }
        

    }
    catch(err){
       
        res.json({status:500})
    }
})

router.get('/ejs',async function(req,res){
    try {
    const listUser= await UserModel.find()
    
    res.render('page/index',{listUser,text:"<h2>gửi html</h2>"});//trả ra mảng object
    //tự tìm file index trong wiews nhờ app.set('view engine', 'ejs');
    //khi dùng file ejs thì nó sẽ đọc file từ wiews
    } catch (error) {
        res.json({mess:"lỗi server"})
    }
 
})


router.get('/index',function(req,res){
    res.sendFile(path.join(__dirname,"./views/index.html"));
})
router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"./views/login.html"));
})
router.get('/index1',function(req,res){
    res.sendFile(path.join(__dirname,"./views/index1.html"));
})
router.get('/login1',function(req,res){
    res.sendFile(path.join(__dirname,"./views/login1.html"));
})

router.get('/home',Checklogin,function(req,res){
    res.sendFile(path.join(__dirname,"./views/home.html"));
})
router.get('/taotaikhoan1',function(req,res){
    res.sendFile(path.join(__dirname,"./views/taotaikhoan.html"));
})
router.get('/login1',Checklogin,function(req,res){
    res.sendFile(path.join(__dirname,"./views/login1.html"));
})
router.get('/todolist',Checklogin,function(req,res){
    res.sendFile(path.join(__dirname,"./views/ToDoList.html"));
})

router.use('/public',express.static(path.join(__dirname,"./public")))

router.use('/views',express.static(path.join(__dirname,"./views")))

module.exports=router;