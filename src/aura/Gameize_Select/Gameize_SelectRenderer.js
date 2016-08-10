({
    render : function(component, helper) {
        var ret = this.superRender();
        document.onkeyup = function(e){
            if (e.keyCode === 27) {
                helper.hideModal(component, helper);

            }   // esc
        };        
        return ret;
    },
})