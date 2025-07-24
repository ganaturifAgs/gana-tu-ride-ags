

function pagar(e){
        let cliente = $(e.currentTarget).prev()[0].innerHTML
        let id = parseInt(e.currentTarget.id.split("-")[0])
        alertify.confirm("Boletos Pagados",`¿Esta seguro que desea establecer el boleto de <strong> ${cliente} </strong> como pagado?`,()=>{
                $.ajax({url:`/gposBoletos/${id}`,type:'PUT',data:{estatus:3},success:function(res){
                        console.log(res)
                        alertify.success(`El boleto ${id} se establecio como pagado`)
                        $(".btn-cerrar").trigger( "click" );
                    }})
            },()=>{alertify.error("Acción cancelada")}).autoCancel(20)
        }
function eliminarBoleto(e){
    let cliente = $(e.currentTarget).prev().prev()[0].innerHTML
        let id = parseInt(e.currentTarget.id.split("-")[0])
        alertify.confirm("Eliminar Boleto",`¿Esta seguro que desea eliminar el boleto de <strong> ${cliente} </strong>?`,()=>{
                $.ajax({url:`/gposBoletos/${id}`,type:'DELETE',success:function(res){
                        if(res.success)
                            alertify.success(`El boleto ${id} fue eliminado satisfactoriamente`)
                        else   
                            alertify.error(res.mgs)
                        $(".btn-cerrar").trigger( "click" );
                    }})
            },()=>{alertify.error("Acción cancelada")}).autoCancel(20)
}

fetch("/usuarios").then(res=>res.json()).then(r=>{console.log(r)})

var Accion = function(clase){
            return {Boletos:{
                            b_pagado:function(id,campos,estilo,funCallback){ 
                                    return {id:id,
                                            campos:campos,
                                            estilo:estilo,
                                            run:function(){
                                                     console.log(this);
                                                     $.ajax({url:'/gposBoletos/find/estatus/2/igual',type:'GET',data:null,success:function(res){
                                                        console.log(res)
                                                        let $lista = divBloque().attr("id","lista")
                                                        if(res.success){
                                                            if(res.data.length>0){
                                                                res.data.forEach( async e=>{  
                                                                   let $row = await divBloque(divFlex($("<a>").attr({"href":`/boletos/impreso/${e._id}`,"target":"_blank"}).html(e._id),"id-tabla"),"renglon",1,"none").append(divFlex(e.datos.nombre,"nomCliente")).append(divFlex($("<i>").addClass("fa-solid fa-hand-holding-dollar"),"iconoPagar").attr("id",`${e._id}-pagado`).on("click",pagar)).append(divFlex($("<i>").addClass("fa-solid fa-trash-can"),"iconoEliminar").attr("id",`${e._id}-eliminar`).on("click",eliminarBoleto))
                                                                    $lista.append($row)
                                                                })
                                                             }else{
                                                                $lista.html("No se encontro nigun boleto sin registrar su pago")
                                                             }
                                                            }else{
                                                                $lista.html("Ocurrio un error al tratar de recupearar los registros del Base de datos: "+ res.msg)
                                                            }                                             
                                                            funCallback($lista)
                                                        }})
                                                }
                                         }["run"]();
                                    },
                            b_vendidos:function(id,campos,estilo,funCallback){  funCallback(divBloque("LISTAR BOLETOS VENDIDOS, PROXIMAMENTE....","renglon proximamanete",1))},
                            b_sinVender:function(id,campos,estilo,funCallback){  funCallback(divBloque("BOLETOS SIN VENDER, PROXIMAMENTE....","renglon proximamanete",1))}
                         },                     
                       Sorteos:{
                            s_nuevo:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("FUNCION SORTEO NUEVO, PROXIMAMENTE....","renglon proximamanete",1))},
                            s_actual:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("FUNCION ACTUALIZAR SORTEO, PROXIMAMENTE....","renglon proximamanete",1))},
                            s_terminar:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("FUNCION TERMINAR SORTEO, PROXIMAMENTE....","renglon proximamanete",1))}
                        },
                     Ganadores:{
                            g_ver:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("FUNCION VER GANADORESS, PROXIMAMENTE....","renglon proximamanete",1))},
                            g_buscar:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("Función Buscar Ganadores, PROXIMAMENTE....","renglon proximamanete",1))},
                            g_imagenes:(id,campos,estilo,funCallback)=>{  funCallback(divBloque("Modulo para material multimedia, PROXIMAMENTE....","renglon proximamanete",1))}
                        }                    
                    }[clase]
    
    }


