import Class from "lib/Class"

var Framework = Framework || {};

/**
 * To apply behaviour, call behaviour.apply(element)
 * To get the applied behaviour, call element.data('getBehaviourResult')('Behaviour.Name')
 * e.g.  $('[data-behaviour="Component.Toggle"]').data('getBehaviourResult')('Component.Toggle')
 *
 * @type {{}|Framework}
 */

Framework.Behaviour = new Class({
  filters: {},
  addFilter:function(name, instantiator){
    this.filters[name] = instantiator;
  },
  addFilters:function(filters){
    for (const filter in filters){
      this.addFilter(filter, filters[filter]);
    }
  },
  unapply:function(wrapper){
    this._scan(wrapper, function(target, behaviourClassName){
      var behaviourResult = target.data('getBehaviourResult')(behaviourClassName);
      if (typeof behaviourResult.deinit === 'function'){
        behaviourResult.deinit();
      }
    });
  },
  apply:function(wrapper){
    this._scan(wrapper, $.proxy(this._apply, this));
  },
  _scan:function(wrapper, callback){
    var elements = [];
    if (wrapper.attr && wrapper.attr('data-behaviour')){
      elements.push(wrapper);
    }

    Array.prototype.push.apply(elements, wrapper.find('[data-behaviour]'));

    elements.forEach(function(element){
      if (!element) return;

      var target = $(element);
      var behaviours = target.attr('data-behaviour');
      if (!behaviours) return;

      behaviours.split(/\s+/).forEach(function(behaviourClassName){
        if (behaviourClassName) {
          callback(target, behaviourClassName);
        }
      });
    });
  },
  _apply:function(target, behaviourClassName){
    if (!target || !target.attr) return;

    if(this.filters[behaviourClassName]){
      var id = target.attr('id') || '[no-id]';

      if (this._isAlreadyApplied(target, behaviourClassName)){
        console.warn('Behaviour '+behaviourClassName+' already applied for ' + id);
        return;
      } else {
        this._applyFilter(id, behaviourClassName, target);
      }
    } else {
      console.warn('Behaviour class not found: ' + behaviourClassName);
    }
  },
  _getOptionsKey:function(behaviourClassName){
    return 'options-'+behaviourClassName.toLowerCase();
  },
  _applyFilter:function(id, behaviourClassName, target){
    var options = target.data(this._getOptionsKey(behaviourClassName));
    options = options || {};
    var behaviourResult = this.filters[behaviourClassName].setup(target, options);

    // Add the behaviourClassName to the target's array of appliedBehaviours.
    var appliedBehaviours = this._getAppliedBehaviours(target);
    appliedBehaviours[behaviourClassName] = behaviourResult;
    target.data('appliedBehaviours', appliedBehaviours);
    this._addBehaviourGetterMethod(target);
  },
  _isAlreadyApplied:function(target, behaviourClassName){
    return behaviourClassName in this._getAppliedBehaviours(target);
  },
  _getAppliedBehaviours:function(target){
    return target.data('appliedBehaviours') || {};
  },
  _addBehaviourGetterMethod:function(target){
    var self = this;
    if (typeof target.data('getBehaviourResult') != 'function'){
      target.data('getBehaviourResult', function(behaviourClassName){
        return self._getAppliedBehaviours(target)[behaviourClassName];
      });
    }
    if (typeof target.data('getBehaviourResults') != 'function'){
      target.data('getBehaviourResults', function(){
        return self._getAppliedBehaviours(target);
      });
    }
  }
});

export default Framework.Behaviour;
