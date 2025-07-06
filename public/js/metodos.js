

$(".boleto").on("click", function() {
    let $marco = $(this)
    let id_bol = $marco[0].firstElementChild.id;
    let $boleto = $(this).children()[0];
    $apartados = $("#apartados")
    
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.misBoletos=sesion.misBoletos!==undefined ? sesion.misBoletos:[]
    if($marco[0].className.includes("comprado")){ alertify.alert("Gana tu Ride Ags", "El boleto ya ha sido comprado o no está disponible para apartar en este momento ", function(){ alertify.success('Ok')}); return true;}
    

    if(sesion.misBoletos.includes(id_bol)){
        $marco.removeClass("apartado").addClass("libre");
        $apartados.find(`.miBoleto:has(#${id_bol})`).remove();
        sesion.misBoletos = sesion.misBoletos.filter(b => b !== id_bol);
        sessionStorage.setItem('userSesion', JSON.stringify(sesion));
        return true
    }
    if(sesion.misBoletos.length==5){
        alertify.alert("Gana tu Ride Ags","Ya ha seleccionado los 5 numeros participantes. De clic en uno de sus numeros para eliminarlo",function(){ alertify.success('Ok')})
            
    }else{
        $marco.removeClass("libre").addClass("apartado");
        let $miBole = $("<div>").addClass("miBoleto")
        $miBole.html($($boleto).clone());
        $apartados.append($miBole)
        sesion.misBoletos.push(id_bol)
        if(sesion.misBoletos.length==5){
            $apartados.append($("<p>").html("Apartar Numeros").css({"border":"1px solid black","padding":"2px 10px"}))
        }
        sessionStorage.setItem('userSesion',JSON.stringify(sesion))
    }

    
   //     $.get(`boletos/actualizar/${id_bol}/${estatus}`).done(r=>{ })
  
});

$("#generarNums").on("click",()=>{
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.misBoletos=sesion.misBoletos!==undefined ? sesion.misBoletos:[]
    let cantAct = sesion.misBoletos.length
    if(cantAct<5){
        $apartados = $("#apartados")
        $apartados.css("background-image","url('../gif/generarNumeros.gif')")
        $.get(`boletos/azar/${5-cantAct}`).done(resp=>{
            resp.forEach(e => {
                let $miBole=$("<div>").addClass("miBoleto").click(()=>{ 
                    let boletos=document.getElementById("boletos")
                    boletos.scrollTo(0,parseInt($(`#boleto_${e._id}`).position().top))
                })

                let $num = $(`#${e._id}`)
                $miBole.html($num.clone())
                $apartados.append($miBole)
                sesion.misBoletos.push(e._id)
                sessionStorage.setItem('userSesion',JSON.stringify(sesion))
                $apartados.css("background-image","none")
                $($num[0].parentElement).removeClass('libre').addClass("apartado")
            });
          $apartados.append($("<p>").html($("<div>").html("Apartar Numeros").addClass("btn-Apartar")).on("click",e=>{ 
           let $datos = alertify.genericDialog ($('#dataUserForm')[0]).set({frameless:false,title:"Datos Personales"})
                $(".ajs-primary").html($("<div>").addClass("btn_submit").html("<button>Enviar</button>"))
                $(".btn_submit button").click((e)=>{ 
                        console.log(e)
                        if(vacio($("#nom")) || vacio($("#dir")) || vacio($("#cd")) || vacio($("#tel"))) {alertify.alert("Información Incompleta","Debe de llenar todos los campos solicitados");  return false}
                        if(!validarTel($("#tel").val())) return false;
                        let datosCliente={nombre:$("#nom").val(),direccion:$("#dir").val(),ciudad:$("#cd").val(),telefono:$("#tel").val()}
                        let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
                        alertify.notify(`¡¡Felicidades!! Sus números ${sesion.misBoletos} `,"success",5,()=>{ 
                            sesion.datosPersonales = datosCliente
                            sessionStorage.setItem('userSesion',JSON.stringify(sesion))
                            $.post("boletos/actualizar",{boletos:sesion.misBoletos,datos:JSON.stringify(datosCliente)}).done((resp)=>{
                                let mensaje=`Hola, acabo de apartar estos numeros: ${sesion.misBoletos}`
                                window.open(`https://wa.me/524492764223?text=${mensaje}`,"_blank");
                                document.location.href="/"
                            })
                            $datos.close()
                         });
                        console.log(datosCliente)
                    })
                }))
        })
    }else{
        alertify.alert("Gana tu Ride Ags","Usted ya tiene sus 5 números seleccionados",function(){ alertify.success('Ok')})
    }
})

function validarTel(v){
    if(v.length == 10){
        let i = parseInt(v)
        if(i<999999999){
            alertify.alert("Formato incorrecto","El formato del telefono debe ser de 10 digitos sin espacio y sin guiones (1234567890)") 
            return false
        }
    }else{
        alertify.alert("Digitos Incorrecto","El formato del telefono debe ser de 10 digitos sin espacio y sin guiones (1234567890)") 
        return false
    }
    return true
}
function vacio(v){
    return  v.val().trim()=='' ? true:false
}









let radioCount = $(".slides input[type='radio']").length;
var n=2
let autoCarrusel = setInterval(cambiaImagen,5000);
function cambiaImagen(){
    $(`input#img-${n}`).click()
    n = n==radioCount ? 1:n+1
}

//((_id=Number(4))=>{$.get(`boletos/apartar/${_id}`,{id:_id},dataType="json").done(r=>console.log(r))})();




