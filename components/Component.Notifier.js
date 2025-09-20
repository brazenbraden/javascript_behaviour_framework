import Class from "lib/Class"

var Component = Component || {};

Component.Notifier = new Class({
    notifier: null,
    eventBus: null,
    init:function(notifier, eventBus){
        this.notifier = notifier;
        this.eventBus = eventBus;
        this.initialiseHandlers();
    },
    initialiseHandlers:function(){
        this.eventBus.subscribe('notification', 'alert', $.proxy(this.notify, this));
    },
    notify:function(data){
        if (data){
            this.notifier.alert(data);
        }
    }
});

export default Component.Notifier;
