

$(document).ready(res=>{
    localStorage
    let _idUser = moment().locale('es-mx').format('L_LTS').replaceAll("/","-")
    sessionStorage.setItem("userSesion",JSON.stringify({id:'sesUsu'+_idUser,estatus:'onLine'}))
    fetch('https://api.ipify.org?format=json')
        .then(r => r.json()).then(d => {
            $.post(`sesion/${d.ip}`).done(res=>{ 
                console.log(`[${d.ip}] ip del cliente guardada en la sesión.`)
            })
            sessionStorage.setItem("userIP", d.ip);
        })
})



$("#sorteoActivo>button").on("click", function() {
    var document = window.document;
    document.location.href = "/sorteos";
});