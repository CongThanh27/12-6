/*function dangky(){
    const name =$("#name").val();
    const password =$("#password").val();
    const confim_password =$("#confim_password").val();

    if(password===confim_password&&password!=""&&confim_password!=""&&name!="")
   {
       $.ajax({
       type :"POST",
       url:`/User?name=${name}&password=${password}&username=${name}`,
        ///localhost:3000/User?name=Thanh&password=280720021&username=congthanh
   })
   .then(function(data){
       console.log(data);
       window.location.href = "/views/dangnhap.html";    // chuyển trang

   })
   .catch(function(err){
        console.log(err);

   });
   }
   else {
   
    console.log("password!=confim_password or rỗng");
   
   }

}*/
/*function dangky(){
    const name =$("#name").val();
    const password =$("#password").val();
    const confim_password =$("#confim_password").val();

    if(password===confim_password&&password!=""&&confim_password!=""&&name!="")
   {
       $.ajax({
       type :"POST",
       url:"/User/thembody",
        ///localhost:3000/User?name=Thanh&password=280720021&username=congthanh
        data:{
            name:name,
            password:password,
            username:name,
        }
   })
   .then( data => {
       console.log(data);
       window.location.href = "/views/dangnhap.html";    // chuyển trang

   })
   .catch( err => {
        console.log(err);

   });
   }
   else {
   
    console.log("password!=confim_password or rỗng");
   
   }

}*/
async function dangky(){
   var form =$(".form")[0]; //chuyển jquery sang dom
   var data = new FormData(form);// để gửi data về server
    const res = await $. ajax({
        type :"POST",
        url:"/profile",
        data:data,
        processData: false,//ngăn data chuyển sang xxx
        contentType: false,// giữ nguyên forn
    })
   
}
async function dangkyvoinhieufile(){
    var form =$(".form1")[0]; //chuyển jquery sang dom
    var data = new FormData(form);// để gửi data về server
     const res = await $. ajax({
         type :"POST",
         url:"/photos/upload",
         data:data,
         processData: false,//ngăn data chuyển sang xxx
         contentType: false,// giữ nguyên forn
     })
    console.log(86,res);
 }
 async function dangkyvoinhieufile1(){
    var form =$(".form2")[0]; //chuyển jquery sang dom
    var data = new FormData(form);// để gửi data về server
     const res = await $. ajax({
         type :"POST",
         url:"/cool-profile",
         data:data,
         processData: false,//ngăn data chuyển sang xxx
         contentType: false,// giữ nguyên forn
     })
    console.log(98,res);
 }