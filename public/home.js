

/*$.ajax({
    type:'GET',
    url:'/User',// nhận req từ server
    
})//req
.then(function(data){
    console.log(data);
    let greeting=`
    <p> Xin chao ${data[0].name}</p>
        
    `
    $("body").append(greeting)
})
.then(function(err){
    console.log(err);
})*/
var buttonCount=0;
var tranghientai=1;
number(tranghientai);
$.ajax({
    type:'GET',
    url:'/User/show',// nhận req từ server
})
.then(function(data){
    console.log(data);
     buttonCount=Math.ceil(data.length/3);//làm tròn lên
   
     for (let i =0 ; i < buttonCount; i++) {
         let button1=`<button class="number1${i+1}" onclick="number(${i+1})">${i+1}</button>
         `
         $(".number").append(button1);
         
     }
})
.catch(function(err){
     console.log(err);
});
function number(page){
    tranghientai=page;
    
    //---------------------------
    let them=`
    <style>
    .number1${page} {
        border: 5px solid black;
        color: black;
    }
    </style
    `
    $(".cssthem").html(them);
    //--------------------------
    if(page===1){
        let them1=`
    <style>
    .prev {
        display: none;
    }
    </style
    `
    $(".cssthem1").html(them1);
    }
    else{
        let them2=`
        <style>
        .prev {
            display: block;
        }
        </style
        `
        $(".cssthem1").html(them2); 
    }
    //----------------------------

    if(page===buttonCount){
        let them3=`
    <style>
    .next {
        display: none;
    }
    </style
    `
    $(".cssthem2").html(them3);
    }
    else{
        let them4=`
        <style>
        .next {
            display: block;
        }
        </style
        `
        $(".cssthem2").html(them4); 
    }
    var skip1=((page-1)*3);
    $.ajax({
        type :"GET",
        url:"/User/page?skip="+skip1+"&limit=3",
        /*url:"/User/pagebody",
        data:{
            skip:skip1,
            limit:"3",

        } */
      
    })
    .then(function(data){
        console.log(data);//trả về 3 phần tử
         let div=` `;//rỗng
        for (let i =0 ; i < data.length; i++) {
            div +=`<div > ${data[i].name} </div>`
            
        }
        console.log(div);
        $(".datap").html(div);// ghi đè html, xóa đi mấy cái cũ
    })
    .catch(function(err){
         console.log(err);
 
    });
}


function prev1(){
   number(tranghientai-1)
   
}
function next1(){
    number(tranghientai+1)

}
//sửa lại sự kiện
//$(".next").attr("onclick",  `number1${page+1}`)

async function logout(){
    try{
       
    let data =await $.ajax({
        type :"POST",
        url:"/User/logout",
    })
    
    window.location.href = "/login1";
    }
    catch(err){
        console.log(err);
    }

}