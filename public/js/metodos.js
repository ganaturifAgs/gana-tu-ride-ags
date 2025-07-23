

const $btn_apartar = function(){return  $("<div>").html("Apartar Números").addClass("btn-Apartar").on("click",e=>{ 
            $('#dataUserForm').removeClass("ocultar")
           let $datos = alertify.genericDialog ($('#dataUserForm')[0]).set({frameless:false,title:"Datos Personales"})
                $(".ajs-primary").html($("<div>").addClass("btn_submit").html("<button>Enviar</button>"))
                $(".btn_submit button").on('click',(e)=>{ 
                        if(vacio($("#nom")) || vacio($("#tel"))  || vacio($("#edo")) ) {alertify.error("Debe de llenar todos los campos solicitados");  return false}
                        if(!validarTel($("#tel").val())) return false;
                        $datos.close()                        
                        alertify.myAlert({message:"Al cerrar esta ventana, acepta todos los terminos y condiciones de este sorteo. Será redirigido a Whatsapp",botones:[{text:`<span>Acptar </span><i class='fab fa-whatsapp fa-3x'></i>`,className:"ajs-ok",key:27}],funcion:direccionarWA}).set({title:"Aviso Importante"})
                       
                    })
                })
            }


let direccionarWA = function(e){
    let datosTMP={nombre:$("#nom").val(),telefono:$("#tel").val(),estado:$("#edo").val()}
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.datosPersonales = datosTMP
    datosCliente=JSON.stringify(datosTMP)
    let boletosCommit=[]
    $.get("gposBoletos/new/id").done(nuevo=>{
        sesion.misBoletos.forEach((b,i,a)=>{      
            $.ajax({url:"boletos/"+b,type:'PUT',data:{estatus:2,grupoBoleto:nuevo},success:function(resp){
                boletosCommit.push(resp.numero)
                if(boletosCommit.length==5){
                        datos={_id:nuevo,numeros:JSON.stringify(boletosCommit),sorteo:resp.sorteo,estatus:2,datos:datosCliente,fecha:Date()}
                        $.ajax({url:"gposBoletos/",type:'POST',data:datos,success:function(resGpo){
                            if(resGpo.success){
                                sesion.BoletosReservados=sesion.misBoletos
                                sesion.misBoletos=[]
                                sessionStorage.setItem('userSesion',JSON.stringify(sesion))
                                let mensaje=`Hola, soy *${datosTMP.nombre}* acabo de apartar estos números: *${boletosCommit}*, para el sorteo *${$("#corp").html().replace("#","No.")}*. Folio: *${nuevo}* En cuanto tenga el comprobante de pago, se lo haré llegar por este medio para asi recibir mi boleto.`
                                window.open(`https://wa.me/524494808482?text=${mensaje}`,"_blank","")
                                document.location.href=`/`   
                                }
                            }})
                  }
            }})                                                                                                        
        })
    })

}


$(".boleto").on("click", function() {
    let $marco = $(this)
    let id_bol = $marco[0].firstElementChild.id;
    let $boleto = $(this).children()[0];
    $apartados = $("#apartados")
    
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.misBoletos=sesion.misBoletos!==undefined ? sesion.misBoletos:[]
    let clases = $marco[0].className
    if(clases.includes("comprado") || clases.includes('reservado')){ alertify.alert("Gana tu Ride Ags", "El boleto ya ha sido comprado o no está disponible para apartar en este momento ", function(){ alertify.success('Ok')}); return true;}
    

    if($marco[0].className.includes("apartado")){
        $marco.removeClass("apartado").addClass("libre");
        $apartados.find(`.miBoleto:has(#${id_bol})`).remove();
        console.log(id_bol)
        sesion.misBoletos = sesion.misBoletos.filter(b => b !== parseInt(id_bol));
        sessionStorage.setItem('userSesion', JSON.stringify(sesion));
        $apartados.find(".btn-Apartar").remove();
        return true
    }else{
    if(sesion.misBoletos.length==5){
        alertify.alert("Gana tu Ride Ags","Ya ha seleccionado los 5 numeros participantes. De clic en uno de sus numeros para eliminarlo",function(){ alertify.success('Ok')})
            
    }else{
        $marco.removeClass("libre").addClass("apartado");
        let $miBole = $("<div>").addClass("miBoleto")
        $miBole.on('click',() =>{ 
                    let boletos=document.getElementById("boletos")
                    boletos.scrollTo(0,parseInt($(`#boleto_${id_bol}`).position().top-200))
                })
        $miBole.html($($boleto).clone());
        $apartados.append($miBole)
        sesion.misBoletos.push(parseInt(id_bol))
        if(sesion.misBoletos.length==5){
            $apartados.append($("<div>").addClass('Padre').append($btn_apartar()))
        }
        sessionStorage.setItem('userSesion',JSON.stringify(sesion))
    }
}
    
   //     $.get(`boletos/actualizar/${id_bol}/${estatus}`).done(r=>{ })
  
});

$("#generarNums").on("click",(e)=>{
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.misBoletos=sesion.misBoletos!==undefined ? sesion.misBoletos:[]
    let cantAct = sesion.misBoletos.length
    if(cantAct<5){
        $(e).prop("enabled",true)
        $apartados = $("#apartados")
        let $tmp = $("<div>")
        $apartados.css("background-image","url('../gif/generarNumeros.gif')")
        $.get(`boletos/azar/${5-cantAct}`).done(resp=>{
            resp.forEach(e => {
                let $miBole=$("<div>").addClass("miBoleto")
                    $miBole.on('click',() =>{ 
                    let boletos=document.getElementById("boletos")
                    boletos.scrollTo(0,parseInt($(`#boleto_${e._id}`).position().top-200))
                })
                let $num = $(`#${e._id}`)
                $miBole.html($num.clone())
                $tmp.append($miBole)
                sesion.misBoletos.push(e._id)
                sessionStorage.setItem('userSesion',JSON.stringify(sesion))

                $($num[0].parentElement).removeClass('libre').addClass("apartado")
            });
           
        setTimeout(()=>{
                $apartados.append($tmp)
                $apartados.css("background-image","none")
                $apartados.append($("<div>").addClass('Padre').append($btn_apartar()))
                $(e).prop("enabled",true)
          },5000)
        })
    }else{
        alertify.alert("Gana tu Ride Ags","Usted ya tiene sus 5 números seleccionados",function(){ alertify.success('Ok')})
    }
})

function validarTel(v){
    if(v.length == 10){
        let i = parseInt(v)
        if(i<999999999){
            alertify.error("Error de formato") 
            return false
        }
    }else{
        alertify.notify("Deben ser 10 digitos",'ajs-x',5) 
        return false
    }
    return true
}
function vacio(v){
    return  v.val().trim()=='' ? true:false
}

function sorteoActivo(){
    $.get("/sorteos/activo").done( async function(resp) {
        if( await resp.success) return await resp.data._id;
        else return null;
    }).fail(function() {
        console.error("Error al obtener el sorteo activo");
    });
}

$(".copiar").on("click",function(e){
    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }
    let $texto = e.currentTarget.innerText
    let $this = $(e)
    try{
    copyToClipboard($texto)
        alertify.success("Texto copiado al portapapeles")
        $this.addClass("copiado")
    }catch(err){
        alertify.error("Error al copiar el texto")
        console.error('Error al copiar el texto: ', err);
    }
})

$("#whatsappPagos").on("click",function(e){
    let mensaje = `Tome una foto de su comprobante de pago ahora y elimine este mensaje.`
    window.open(`https://wa.me/524494808482?text=${mensaje}`,"_blank","")
})

$(".iconos").on("click",function(e){
    $(".iconos").removeClass("seleccionado")
    $(this).addClass("seleccionado")
    $("input[name='por']").removeAttr("checked")
    this.id === "icono_numero" ? $("input[name='buscador']").attr("placeholder","Número de Boleto") : $("input[name='buscador']").attr("placeholder","Teléfono del Comprador")
    this.id === "icono_numero" ? $("input[id='por_numero']").attr("checked","checked") : $("input[id='por_telefono']").attr("checked","checked")
})

$("#buscadorBoletos").on("click", function(e){
    e.preventDefault();
    let tipo = $("input[name='por']:checked").val();
    let aBuscar = $("input[name='buscador']").val();
    $.get("/sorteos/activo").done( async function(resp) {
        let busqueda = tipo==="1" ? `boletos/numero/${aBuscar}/sorteo/${resp.data._id}` : `gposBoletos/telefono/${aBuscar}`;
        $("#listaResultados").empty();
        console.log(aBuscar.trim(), busqueda)
        if(aBuscar.trim() !== ""){  
            $.get(busqueda).done(resp=>{
                if(resp.success){
                    if(resp.data.length > 0){
                        resp.data.forEach(boleto => {
                            $("#listaResultados").append(`<div class="Padre"><div id="busquedaNombre">${boleto.datos.nombre}</div><div id="busquedaEstado">${boleto.datos.estado}</div> - <div id="busquedaAccion"> <a href="https://ganaturideags.com/boletos/impreso/${boleto._id}" target="_blank">Ver boleto</a></div></div>`);
                        });
                    }else{
                        if(resp.data.estatus > 0)
                            $.get((`gposBoletos/${resp.data.grupoBoleto}`)).done(boleto=>{
                                    $("#listaResultados").append(`<div class="Padre"><div id="busquedaNombre">${boleto.datos.nombre}</div><div id="busquedaEstado">${boleto.datos.estado}</div> - <div id="busquedaAccion"> <a href="https://ganaturideags.com/boletos/impreso/${boleto._id}" target="_blank">Ver boleto</a></div></div>`);
                            });
                        else
                            $("#listaResultados").append(`<div class="Padre"><div>No se encontraron resultados para el dato proporcionado.</div></div>`);
                    }
                }else{
                    $("#listaResultados").append(`<div class="Padre"><div>Error al buscar boletos. Intente nuevamente más tarde.</div></div>`);
                }
            });
        }else{
            alertify.error("Debe ingresar un número de boleto o teléfono para buscar.")
        }
    }).fail(function() {
        console.error("Error al obtener el sorteo activo");
        alertify.error("Error al obtener el sorteo activo. Intente nuevamente más tarde.");
    });

});