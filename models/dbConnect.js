const mongoose = require('mongoose');//gọi
mongoose.connect("mongodb+srv://nguyencongthanh:28072002thanh@cluster0.1sbqf.mongodb.net/NCT?retryWrites=true&w=majority");// tạo liên kết với mongoDB server

module.exports=mongoose;
