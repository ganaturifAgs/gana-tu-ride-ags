


alertify.genericDialog || alertify.dialog('genericDialog',function(){
            return {
                main:function(content){
                    this.setContent(content);
                },
                setup:function(){
                    return {
                        focus:{
                            element:function(){
                                return this.elements.body.querySelector(this.get('selector'));
                            },
                            select:true
                        },
                        options:{
                            title:true,
                            basic:true,
                            maximizable:false,
                            resizable:false,
                            padding:true
                        }
                    };
                },
                settings:{
                    selector:undefined
                }
            };
        });


if(!alertify.myAlert){
   alertify.dialog('myAlert',function(){
        return{
        main:function(datos){
            console.log(datos)
            this.message = datos.message
            this.buttons = datos.botones
            this.callback = datos.funcion
        },
        setup:function(){
            return { 
                buttons:[{text:"Aceptar y redireccionar a <i class='fab fa-whatsapp fa-1x'></i>",invokeOnClose:true,className:"ajs-ok",key:27}],
                focus: { element:0 }
               
            };
        },
        prepare:function(){
            this.setContent(this.message);
        },
        callback: this.callback
        
    }});


}