$(document).ready(function(){
    let radioCount = $(".slides input[type='radio']").length;
    var n=2
    var cont=0
    let autoCarrusel = setInterval(cambiaImagen,5000);
    function cambiaImagen(){
        $(`input#img-${n}`).click()
        n = n==radioCount ? 1:n+1   
        if(++cont==15)
            clearInterval(autoCarrusel)
    }

})