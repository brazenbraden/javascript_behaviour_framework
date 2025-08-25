const Class = function(definition){
    return function(){

        // Instantiate.
        var instance = function(def){
            var Super = new function(){
                return function(){};
            };
            Super.prototype = def;
            return new Super;
        }(definition);

        // Super methods.
        instance.setOptions = function(options){
            instance.options = {};
            for (const key in definition.options){
                instance.options[key] = definition.options[key];
            }
            for (const key in options){
                instance.options[key] = options[key];
            }
        };

        // Invoke the constructor.
        if (typeof instance.init === 'function'){
            instance.init.apply(instance, arguments);
        }

        // Return the instance.
        return instance;
    };
};

export default Class;
