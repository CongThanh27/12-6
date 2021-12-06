async function login(){
    try{
        
        //console.log(req.headers);
        const name = $("#name").val();
        const password = $("#password").val();
        console.log(name,password);
         
        var res = await $.ajax({
            url:'/User/login',
            type:'POST',
            //data:{name,password},
            data:{
                name:name,
                password:password,
            }
        });
        
        if(res.status===200){
            setCookie('UID',res.idUser,30)//gọi cookie
            window.location.href = "/todolist";
    }
    }
    
    catch (error){
        console.log(error);
    }
}
//cookie-parser
function setCookie(cname, cvalue, exdays) {//(tên,giá trị đưa vào ,thời gian lưu trên hệ thống)
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }