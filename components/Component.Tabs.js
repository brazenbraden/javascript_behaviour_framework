import Class from "lib/Class"

var Component = Component || {};

Component.Tabs = new Class({
  options: {
    tab$: '.nav > li > a'
  },
  init:function(element, options){
    this.setOptions(options);
    element.find(this.options.tab$).on('click', function(e){
      e.preventDefault();
      $(this).tab('show');
    });
  }
});

export default Component.Tabs;
