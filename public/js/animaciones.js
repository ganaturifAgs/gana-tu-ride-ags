$(document).ready(function(){
    let contador=0
    $("#btn-menu").on("click",function(x){
        if(contador==0){
            $(".menu-barra").animate({right:"0px"},500,e=>{
                console.log(e); contador=1;
            });
            
        }else{   
            $(".menu-barra").animate({right:"500px"})
            contador=0
        }
     });

 $("a.menu-link").on("click",function(){
            $(".menu-barra").animate({right:"500px"})
            contador=0
     })

    });
