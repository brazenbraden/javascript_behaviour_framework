import Class from "lib/Class"

var Framework = Framework || {};

/**
 *
 *  Register your triggers in your app.js:
 *
 *  Framework.Trigger.register('click', 'event', function(e, options){
 *      e.preventDefault();
 *      e.stopImmediatePropagation();
 *      Admin.eventBus.publish(options.channel, options.event, options.data);
 *  });
 *
 *  Usage in HTML:
 *
 *  <button data-trigger=event data-trigger-options-event='{"channel": "ajax", "event": "load", "data": {"id": 1}}'>
 *      <span>Click me 1</span>
 *  </button>
 *  <button data-trigger=event data-trigger-options-event='{"channel": "ajax", "event": "load", "data": {"id": 2}}'>
 *      Click me 2
 *  </button>
 *
 */

Framework.Trigger = new Class({
    triggers: {},
    register:function(domEvent, triggerName, callback){
        this.triggers[domEvent] = this.triggers[domEvent] || {};
        this.triggers[domEvent][triggerName] = callback;
    },
    apply:function(wrapper){
        for (var domEvent in this.triggers){
            //console.info('Applying trigger:', domEvent);
            wrapper.on(domEvent, $.proxy(this._handleEvent, this));
        }
    },
    _handleEvent:function(e) {
        var domEvent = e.type;
        var element = $.findWrapper(e.target, '[data-trigger]');
        if (element){
            var triggerName = element.attr('data-trigger');
            var callback = this.triggers[domEvent][triggerName];
            if (callback && typeof callback === 'function'){
                var options = element.data('options-trigger-'+(triggerName.toLowerCase())) || {};
                callback(e, element, options);
            }
        }
    }
});

export default Framework.Trigger;
