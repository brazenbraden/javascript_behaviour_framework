import Class from "lib/Class"

var Component = Component || {};

Component.DatePicker = new Class({
    options: {
        startDate: '04/07/2015',
        format: 'dd/mm/yyyy',
        todayHighlight: false,
        weekStart: 0
    },
    init:function(element, options){
        this.setOptions(options);
        element.datepicker(this.options);
    }
});

export default Component.DatePicker;
