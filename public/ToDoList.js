function toadd(){
    let add =` .modal{
        display:  block;
        
      }`
    $('css').html=add;
}
async function add(){
    try{
        const add =$("#add").val();
    let data = await $.ajax({
        type :"POST",
        url:"/User/themcongviec",
         data:{
            work:add,
         }
})
if(data){
    window.location.href = "/todolist";
}
    }
    catch(err){
        console.log(err);
    }
    

}
$.ajax({
    type :"GET",
    url:"/User/showcongviec"
  
})
.then(function(data){
    console.log(data);
    let buttonCount=data.length;
     for (let i =0 ; i < buttonCount; i++) {
         $("#todo1").append(
             `
            <li class="ui-state-default draggable" >${data[i].work}</li>
        

             `
         );
         
     }
})
.catch(function(err){
     console.log(err);
});