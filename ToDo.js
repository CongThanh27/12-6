const mongoose = require('./models/dbConnect');

const TodoSchema = mongoose.Schema(
    {
        work:String,
        status:String,
        idUser:String,

        
    },
    {collection: "todo"}
);
const TodoModel = mongoose.model("todo",TodoSchema);
module.exports=TodoModel;

  