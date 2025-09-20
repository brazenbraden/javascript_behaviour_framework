import Class from "lib/Class"
import "toastr"

var Adapter = Adapter || {};

// https://github.com/CodeSeven/toastr
Adapter.Toastr = new Class({
    options: {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "1000",
        hideDuration: "1000",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    },
    init:function(){
      toastr.options = this.options;
    },
    alert:function(data){

        if(typeof toastr[data.type] == 'function' ){
            toastr[data.type](data.message, '', this._getOptions(data));
        } else {
            throw 'Method ' + data.type + ' not found in Toastr';
        }
    },
    _getOptions:function(data){
        var options = {};
        data.options = data.options || {};
        if(data.options.sticky){
            options.timeOut = 0;
        }
        return options;
    }
});

export default Adapter.Toastr;
