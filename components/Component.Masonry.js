import Class from "lib/Class"

var Component = Component || {};

// https://masonry.desandro.com/
Component.Masonry = new Class({
    options: {
        isFitWidth: true,
        isResizable: true,
        itemSelector: '.grid-item',
        columnWidth: 200,
        transitionDuration: 0
    },
    m: null,
    eventBus: null,
    init:function(element, options, eventBus){
        this.setOptions(options);
        this.m = new window.Masonry(element[0], this.options);
        eventBus.subscribe('listings', 'change', $.proxy(this.onChange, this));
    },
    onChange:function(){
        this.m.layout();
    }
});

export default Component.Masonry;
