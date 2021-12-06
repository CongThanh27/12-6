async function dangnhap(){
    try{
        const name = $("#name").val();
        const password = $("#password").val();
        let trave = await $.ajax({//đưa dữ liệu dạng req cho bên login thực hiện,xong dữ liệu trả về ở trên màn hình
            url:'/User/login1',
            type:'POST',
            data:{name,password}
        })
        if(trave.status===200){//nếu status trên màn hình trả ra 200, bắt data trên màn hình
            setCookie('NCT',trave.idUser,60)// cài cookies lên trình duyệt nếu đăng nhập thành công
            window.location.href = "/todolist";
        }
    }
    catch(err){
        console.log(err);
    }
}
 $.ajax({//đưa dữ liệu dạng req cho bên login thực hiện,xong dữ liệu trả về ở trên màn hình
    url:'/kiemtracookies',
    type:'GET',
}).then((data)=>{
    if(data.status===200){//nếu status trên màn hình trả ra 200, bắt data trên màn hình
        window.location.href = "/todolist";
}
})

//cookie-parser
function setCookie(cname, cvalue, exdays) {//(tên,giá trị đưa vào ,thời gian lưu trên hệ thống)
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }