$.ajax({
    url:"/",
    type:"GET",
})
.then((data)=>{
    console.log(data);
    if(data.status!==200){
        
          window.location.href = "/login";
    }
    else{
        window.location.href = "/index";
    }
  
})
.cacth((err)=>{
    console.log(err);
})