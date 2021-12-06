const mongoose = require('./models/dbConnect');//gọi
//mongoose.connect("mongodb+srv://nguyencongthanh:28072002thanh@cluster0.1sbqf.mongodb.net/NCT?retryWrites=true&w=majority");// tạo liên kết với mongoDB server

const UserSchema = mongoose.Schema(
    {
        name:String,
        password:String, 
        username:String, 
        avatar:String,
        
    },
    {collection: "user"}
);
const UserModel = mongoose.model("user",UserSchema);
module.exports=UserModel;

/*UserModel.create({
    name:"Khang",
    password:'123',
    username:'thienkhang',
})
.then((data)=>{
    console.log(23,data);
})
.catch((err)=>{
    console.log(26,err);
})   */
