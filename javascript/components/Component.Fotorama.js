import Class from "lib/Class"

var Component = Component || {};

// http://fotorama.io/
Component.Fotorama = new Class({
    options: {
        start: false,

        // Fotorama Options
        width: '100%',
        ratio: 1,
        nav: 'thumbs',
        navposition: 'bottom',
        allowfullscreen: false,
        transition: 'slide',
        captions: true,
        loop: true,
        shadows: true,
        startindex: 0,
        keyboard: true
    },
    element: null,
    init:function(element, options){
        this.setOptions(options);
        this.element = element;
        if (this.options.start){
            this.start();
        } else {
            this.element.on('mouseenter', $.proxy(this.start, this));
        }

    },
    start:function(){
        this.element.fotorama(this.options);
    }
});

export default Component.Fotorama;
