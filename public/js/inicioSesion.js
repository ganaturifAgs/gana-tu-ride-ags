
$(document).ready(res=>{

    localStorage
    let _idUser = moment().locale('es-mx').format('L_LTS').replaceAll("/","-")
    sessionStorage.setItem("userSesion",JSON.stringify({id:'sesUsu'+_idUser,estatus:'onLine'}))
})




$("#sorteoActivo>button").on("click", function() {
    var document = window.document;
    document.location.href = "/sorteo";
});