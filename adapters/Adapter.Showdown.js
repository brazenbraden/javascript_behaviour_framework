import Class from "lib/Class"
import showdown from "showdown"

var Adapter = Adapter || {};

// https://github.com/showdownjs/showdown
Adapter.Showdown = new Class({
    options: {},
    converter: null,
    init: function () {
        this.converter = new showdown.Converter();
    },
    makeHtml:function(markdown){
        return this.converter.makeHtml(markdown);
    }
});

export default Adapter.Showdown;
