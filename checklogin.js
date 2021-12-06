


const UserModel = require("./user")

const BlackListModel = require("./models/blackList")
var jwt = require('jsonwebtoken');
async function Checklogin(req,res,next){
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
            req.user=user;
            console.log(21,user);
           next();
           
        }
        else{
            res.json({status:400})
        }
        }
    }
    catch(err){
       
        res.json({status:500})
    }
}
module.exports=Checklogin;
    
