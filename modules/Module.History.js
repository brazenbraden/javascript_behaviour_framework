import Class from "lib/Class"

var Module = Module || {};

Module.History = new Class({
    handlers: {},
    ready: false,
    init:function(handlers){
        this.handlers = handlers;
        var self = this;
        window.onpopstate = function(e){
            if (self.ready){
                self._onChange(e.state);
            }
        };
    },
    start:function(){
        this.ready = true;
    },
    replace:function(state, title, url){
        history.replaceState(state, title, url);
    },
    change:function(state, title, url){
        history.pushState(state, title, url);
        this._onChange(state);
    },
    _onChange:function(state){
        var handler;
        for (handler in this.handlers){
            if (state && state[handler]){
                var callback = this.handlers[handler],
                    options = state[handler];
                callback(options);
            }
        }
    }
});

export default Module.History;
