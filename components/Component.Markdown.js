import Class from "lib/Class"

var Component = Component || {};

Component.Markdown = new Class({
    options: {
        inputSelector: 'textarea',
        outputSelector: '[data-markdown-output]'
    },
    converter: null,
    inputElement: null,
    outputElement: null,
    init:function(element, options, converter){
        this.setOptions(options);
        this.inputElement = element.find(this.options.inputSelector);
        this.outputElement = element.find(this.options.outputSelector);
        this.converter = converter;
        this.applyMarkdown();
        this.inputElement.on('keyup', $.proxy(this.applyMarkdown, this));
    },
    applyMarkdown:function(){
        var html = this.converter.makeHtml(this.inputElement.val());
        this.outputElement.html(html);
    }
});

export default Component.Markdown;
