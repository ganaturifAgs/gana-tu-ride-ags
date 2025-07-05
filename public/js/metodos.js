

$(".boleto").on("click", function() {
    let $marco = $(this)
    let id_bol = $marco[0].firstElementChild.id;
    let $boleto = $(this).children()[0];
    $apartados = $("#apartados")
    
    let sesion = JSON.parse(sessionStorage.getItem('userSesion'))
    sesion.misBoletos=sesion.misBoletos!==undefined ? sesion.misBoletos:[]
    if($marco[0].className.includes("comprado")){alert("El boleto ya ha sido comprado o no está disponible para apartar en este momento "); return true}

    if(sesion.misBoletos.includes(id_bol)){
        $marco.removeClass("apartado").addClass("libre");
        $apartados.find(`.miBoleto:has(#${id_bol})`).remove();
        sesion.misBoletos = sesion.misBoletos.filter(b => b !== id_bol);
        sessionStorage.setItem('userSesion', JSON.stringify(sesion));
        return true
    }
    if(sesion.misBoletos.length==5){
            alert("Ya ha seleccionado los 5 numeros participantes. De clic en uno de sus numeros para eliminarlo")
    }else{
        $marco.removeClass("libre").addClass("apartado");
        let $miBole = $("<div>").addClass("miBoleto")
        $miBole.html($($boleto).clone());
        $apartados.append($miBole)
        sesion.misBoletos.push(id_bol)
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
        })
    }else{
        alert("Usted ya tiene sus 5 números seleccionados")
    }
})


let radioCount = $(".slides input[type='radio']").length;
var n=2
let autoCarrusel = setInterval(cambiaImagen,5000);
function cambiaImagen(){
    $(`input#img-${n}`).click()
    n = n==radioCount ? 1:n+1
}

//((_id=Number(4))=>{$.get(`boletos/apartar/${_id}`,{id:_id},dataType="json").done(r=>console.log(r))})();




