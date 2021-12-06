//require express
const express = require('express');
const UserModel = require("./user")
const TodoModel = require("./ToDo")
var cookieParser = require('cookie-parser')
const path = require("path");
const IndexRouter = require("./indexRouter");
const UserRouter = require("./UserRouter");
const bcrypt = require('bcrypt');
//npm i multer
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"./public/uploads"))//địa chỉ lưu file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(file.originalname) //lấy đuuôi file path.extname(file cần cắt đuôi)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
//Multer
//khởi tạo express
const app = express();
//up file
app.post('/profile', upload.single('avatar'),async function (req, res, next) {
  console.log("--------------------------------------------------------------------");
   // console.log(28,req.file);
   var path=req.file.path;
   // console.log(29,req.body);
   var index= path.indexOf("public")//tìm trong chuỗi path chữ public trả ra vị trí
   var linkavt= path.slice(index,path.length)//cắt chuỗi từ index đến hết
   console.log(34,linkavt);
   try{
     const data= await UserModel.findOne({name:req.body.name})
   
        if(data!=null)// nếu có trả về data còn nếu không trả về null
            res.json("name đã được sử dụng")
        else{
            const newpass =await bcrypt.hash(req.body.password,10);
           const newdata= await UserModel.create({
                name:req.body.name,
                password:newpass,
                username:req.body.username,
                avatar:linkavt 
            })
            if(newdata) 
            {
              res.json(newdata)
              console.log(50,newdata);
            }          
            }
   }
   catch(err){
     res.json(err)
   console.log(57,err);
   }
   
  
    
    
        console.log("--------------------------------------------------------------------");
    // req.file is the `avatar` file
    //trường avatar
    // req.body will hold the text fields, if there were any
  })
  app.post('/photos/upload', upload.array('photos', 10), function (req, res, next) {
    // req.files is array of `photos` files
    console.log(71,req.files);//mảng ojbect
    // req.body will contain the text fields, if there were any
    console.log(73,req.body);
  })
  const cpUpload = upload.fields([{ name: 'avatar1', maxCount: 2 }, { name: 'gallery1', maxCount: 8 }])
  app.post('/cool-profile', cpUpload, function (req, res, next) {
    console.log("------------------------");
    console.log(77,req.files);
    console.log(78,req.body);
  //  console.log(79,req.file.avatar1);
    console.log(80,req.files['avatar1']);
    console.log(81,req.files['avatar1'][0].path);
    console.log(82,req.files['gallery1']);
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar1'][0] -> File
    //  req.files['gallery1'] -> Array
    //
    // req.body will contain the text fields, if there were any
  })

  //EJS
// set the view engine to ejs
//npm i ejs
app.set('view engine', 'ejs');
/*Lưu ý cách mã gửi một chế độ xem cho người dùng bằng cách sử dụng res.render(). 
Điều quan trọng cần lưu ý là res.render()sẽ tìm trong một viewsthư mục cho chế độ xem.
 Vì vậy, bạn chỉ phải xác định pages/indexvì đường dẫn đầy đủ là views/pages/index.
 https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application*/

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use('/User',UserRouter);
app.use('/',IndexRouter);
app.listen(process.env.PORT || 3000);

