$('.user').on('click',async (event)=>{
    try {
        console.log(3,$(event))
    var id =$(event.currentTarget).attr('userId');//lấy thẻ userId
    console.log(5,$(event.currentTarget).attr('userId'));
    const res = await $.ajax({
         type:'GET',
         url:'/User/'+id,
         
             
         
     })
     console.log(15,res);
     $(event.currentTarget).html(res)
    } catch (error) {
        console.log(error);
    }
})