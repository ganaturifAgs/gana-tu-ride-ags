

$(document).ready(res=>{
    localStorage
    let _idUser = moment().locale('es-mx').format('L_LTS').replaceAll("/","-")
    sessionStorage.setItem("userSesion",JSON.stringify({id:'sesUsu'+_idUser,estatus:'onLine'}))
    fetch('https://api.ipify.org?format=json')
        .then(r => r.json()).then(d => {
            $.post(`sesion/${d.ip}`).done(res=>{ 
                console.log(res)
                alertify.success(res.ip,5,()=>{ console.log("se mostro la ip")})
            })
            sessionStorage.setItem("userIP", d.ip);
        })

        
})



$("#sorteoActivo>button").on("click", function() {
    var document = window.document;
    document.location.href = "/sorteos";
});