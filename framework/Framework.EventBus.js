import Class from "lib/Class"

var Framework = Framework || {};

Framework.EventBus = new Class({
    nextIds:{},
    observers:{},
    subscribe:function(channel, event, callback){
        var fullEventName = this._eventName(channel, event);
        this._prepare(fullEventName);

        var id = this.nextIds[fullEventName] += 1;
        this.observers[fullEventName][id] = callback;
        return fullEventName+'::'+id;
    },
    unsubscribe:function(callbackId){
        var parts = callbackId.split('::'),
            fullEventName = parts[0],
            id = parts[1];

        this.observers[fullEventName][id] = null;
    },
    publish:function(channel, event, data){
        this._validate('channel', channel);
        this._validate('event', event);
        var fullEventName = this._eventName(channel, event);
        this._prepare(fullEventName);

        for (const key in this.observers[fullEventName]){
            var callback = this.observers[fullEventName][key];
            if (callback){
                callback(data);
            }
        }
    },
    _prepare:function(fullEventName){
        this.observers[fullEventName] = this.observers[fullEventName] || {};
        this.nextIds[fullEventName] = this.nextIds.hasOwnProperty(fullEventName) ? this.nextIds[fullEventName] : 0;
    },
    _eventName:function(channel, event) {
        return channel + ':' + event;
    },
    _validate:function(name, value){
        if (!value){
            throw "Invalid "+name+" '"+value+"'";
        }
    }
});

export default Framework.EventBus;

