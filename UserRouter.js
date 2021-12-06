const express= require("express");
const router = express.Router();
const path =require("path");
const UserModel = require("./user")
const Checklogin = require("./checklogin.js")
const BlackListModel = require("./models/blackList")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TodoModel = require("./ToDo")

router.post('/themcongviec', function(req,res){
    // giá trị chứa vào object
    var verify = jwt.verify(req.cookies.NCT, '123');
    var id=verify.id;
            TodoModel.create({
                work:req.body.work,
                status:req.body.status,
                idUser:id,
            })
            .then(function(data){
                res.json(data);
               
            })           
            
})
router.put('/doibocuc',async (req,res)=>{
    try{
       let data= await TodoModel.findOne({_id:req.body.keyid})
        if(data){
        if(req.body.group=="todo"){
            TodoModel.updateOne({_id:req.body.keyid} , {status:"1"},)     
            .then(function(data){ res.json("Thành Công")})
            .catch(function(err){               
                res.json("Thất Bại")})      
        }
        else if(req.body.group=="doing"){
            TodoModel.updateOne({_id:req.body.keyid} , {status:"2"},)     
            .then(function(data){ res.json("Thành Công")})
            .catch(function(err){               
                res.json("Thất Bại")})      
        }
        else {
            TodoModel.updateOne({_id:req.body.keyid} , {status:"3"},)     
            .then(function(data){ res.json("Thành Công")})
            .catch(function(err){               
                res.json("Thất Bại")})      
        }
    } 

   
    }
    catch(err){
       
        console.log(err);
    }
        
})
router.get('/showcongviec',(req,res)=>{
    var verify = jwt.verify(req.cookies.NCT, '123');
    var id=verify.id;
    TodoModel.find({idUser:id})
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
       
        res.json(data);
        
    })
    
})
router.get("/:id",(req,res)=>{
   console.log(73,req.params);
    UserModel.findOne({_id:req.params.id})
    .then(function(data){
        console.log(76,data);
        res.render('components/userinfo', {data})// đưa lên giao diện cho ajax bắt
        //res.render('components/userinfo', data)
    })
    .catch(function(err){
       
        res.json(data);
        
    })
    
})
//localhost:3000/User/themcongviec
router.post('/login1', async (req,res)=>{
    try{
        //console.log(req.headers.cookie);
        let data =await UserModel.findOne({name:req.body.name})
        if(data){
            const checkpass = await bcrypt.compare(req.body.password,data.password)
            if(checkpass){
                    var token = jwt.sign({ id: data._id }, '123', {expiresIn:"7 days"});
                    console.log("Đăng nhập thành công");
                  //  console.log(52,data);
                    res.json({mess:"Thành Công",status:200, idUser:token})//data gửi về là 1 object
            }
            
       //idUser lấy data từ máy chủ và gửi ra màn hình
        }
        else{
            console.log("Đăng nhập thất bại");
            res.json({mess:"Thất Bại",status:400})
        }
    }
    catch(err){
        console.log(err);
        res.json({mess:"lỗi",status:500})
    }
})
router.post('/logout', async (req,res)=>{
    try{
        //console.log(req.headers.cookie);
        console.log(req.cookies.NCT);
        await BlackListModel.create({token:req.cookies.NCT})
        res.json({status:200, mess:'Thành Công'})
    }
    catch(err){
        console.log(err);
        res.json({mess:"lỗi",status:500})
    }
})
//localhost:3000/User/login1

router.get('/dangnhap', async (req,res)=>{
    try{
        let data= await UserModel.findOne({name:req.query.name})
        console.log(data);
        res.json(data);
    }
    catch(error)
    {
        console.log(data);
        res.json(data)
    }
    
})
//localhost:3000/User/dangnhap?name=Thanh&password=123
router.get('/dangnhapbody',(req,res)=>{
    UserModel.findOne(
      {name:req.body.name,
       password:req.body.password}
    )
    .then(function(data){
        console.log(data);
        res.json(data);
    })
    .catch(function(err){
        console.log(err);
        
    })
    
})
router.get('/show',Checklogin,(req,res)=>{
    UserModel.find()
    .then(function(data){
       
        res.json(data);
    })
    .catch(function(err){
       
        res.json(data);
        
    })
    
})

router.post('/thembody', function(req,res){
    // giá trị chứa vào object
    
    UserModel.findOne({name:req.body.name})
    .then( async function(data){
        if(data!=null)// nếu có trả về data còn nếu không trả về null
            res.json("name đã được sử dụng")
        else{
            const newpass =await bcrypt.hash(req.body.password,10);
            UserModel.create({
                name:req.body.name,
                password:newpass,
                username:req.body.username,
            })
            .then(function(data){
                res.json(data);
                console.log(223,data);
            })           
            }
    })
    .catch(function(err){
        res.json(err);})
})


module.exports=router;