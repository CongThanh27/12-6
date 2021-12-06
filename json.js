var jwt = require('jsonwebtoken');
//npm i jsonwebtoken
function Token(){
    var token = jwt.sign({ id: '61921654ef08582f895b6a02' }, '123',{expiresIn:"10 days"});
    return token;
}//tạo ra chuỗi mã
function Verify(){//dịch ngược
    var verify = jwt.verify(Token(), '123');
    return verify;
}
console.log(10,Token());
console.log(11,Verify());
console.log(15, new Date(1637584801000));