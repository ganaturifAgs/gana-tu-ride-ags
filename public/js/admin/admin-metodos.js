


$(".acciones>.opcion").on('click',e=>{
    let $este = $(e.currentTarget)
    let id= $este[0].id
    let $padre = $($este[0].parentElement)
    let $abuelo = $($padre[0].parentElement)
    let $visAbuelo = $($abuelo[0].parentElement)
    let arriba = $abuelo.position().top
    let izq = $abuelo.position().left
    let ancho = parseInt($abuelo.innerWidth())
    let alto = parseInt($abuelo.innerHeight())
    let $procedi =   divBloque("","volteador")
   

    $abuelo.css({"position":"absolute","display":"block","width":`${ancho}px`,"height":`${alto}px`})
    $abuelo.animate({left:'10px',top:'50px'},500,'linear',(elem)=>{
          $padre.addClass('ocultar')
          $abuelo.animate({width:'95%',height:'80%'},500,'linear',async (elem)=>{
                $(".card").addClass('ocultar')              
                $visAbuelo.removeClass('ocultar')
                $abuelo.append(divBloque($este.html(),"tituloAdmin negritas"))
                $abuelo.append(divBloque(divFlex("ID","negritas id-tabla"),"renglon girador ").append(divFlex("NOMBRE","negritas")).append(divFlex("CONFIRMAR PAGO","negritas iconoPagos")) )
                $abuelo.append($procedi) 
                
                console.log($padre[0].id)
                let mi_accion = new Accion($padre[0].id)
                mi_accion[id](id,["_id","datos.nombre","fecha"],{"background-color":"black","color":"white"},function(result){
                          console.log(result)
                          $procedi.html(result)         
                          let $tmp = $abuelo.find($(".btn-cerrar"))                           
                           if($tmp.length === 0) {
                             let $cerrar = $("<i>").addClass('fa-solid fa-xmark btn-cerrar').on("click",c=>{
                                     $abuelo.animate({width:`${ancho}px`,height:`${alto}px`},500,'linear',(elem)=>{
                                         $abuelo.animate({left:`${izq}px`,top:`${arriba}px`},500,'linear',(elem)=>{
                                             $abuelo.css({"position":"static","display":"flex","transform":"rotateY(180deg)"})
                                             $(".card").removeClass('ocultar')
                                             $padre.removeClass('ocultar')
                                             $abuelo.find($(".tituloAdmin")).remove()
                                             $abuelo.find($(".girador")).remove()
                                             $abuelo.find($(".volteador")).remove()                              
                                             $cerrar.addClass('ocultar')
                                         });
                                     });
                                 });
                             $abuelo.append($cerrar)
                           }else{
                             $tmp.removeClass('ocultar')
                           }
 
                    })        
        })
    })

            
});


