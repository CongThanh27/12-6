/*function dangnhap(){
    const name =$("#name").val();
    const password =$("#password").val();
    console.log(28,name,password);
    $.ajax({
        type :"GET",
        url:`/User/dangnhap?name=${name}&password=${password}`,
    })
    .then(function(data){
        console.log(data)
       window.location.href ="/views/home.html"

    })
    .then(function(err){
        console.log(err)

    })
}*/
function dangnhap(){
    const name =$("#name").val();
    const password =$("#password").val();
    console.log(28,name,password);
    $.ajax({
        type :"GET",
        url:'/User/dangnhapbody',
        data:{
            name:name,
            password:password,
        }
    })
    .then(function(data){
        console.log(data)
       window.location.href ="/views/home.html"

    })
    .then(function(err){
        console.log(err)

    })
}