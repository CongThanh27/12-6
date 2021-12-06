 async function vaohome(){
     try{
        let data= await $.ajax({
    url:"/kiemtracookies",
    type:"GET",
    })

    console.log(data);
    
    if(data.status!==200){  
       window.location.href = "/login1";
    }  
    else{
        window.location.href = "/todolist";
         
    }  
}
catch(err)  {
    console.log(err);
}  

}
  



 

