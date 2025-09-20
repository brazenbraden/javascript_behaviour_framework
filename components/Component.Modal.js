import Class from "lib/Class"

var Component = Component || {};

Component.Modal = new Class({
    modal: null,
    init: function(element){
        this.modal = this.getModal(element);
        element.on('close', $.proxy(this.close, this));
    },
    close:function(){
        this.modal.modal('hide');
    },
    getModal:function(el){
        var $el = $(el);
        return $el.hasClass('modal') ? $el : $el.parents('.modal');
    }
});

export default Component.Modal;
