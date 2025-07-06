
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