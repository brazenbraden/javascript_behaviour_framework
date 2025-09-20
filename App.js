// Downloaded non-CDN javascripts
import "vendor/bootstrap-datepicker.min"

/** Framework */
import "lib/Class"
import "lib/String"
import "lib/Selectors"

import Behaviour from "framework/Framework.Behaviour"
import Trigger from "framework/Framework.Trigger"
import EventBus from "framework/Framework.EventBus"
const Framework = {
  Behaviour,
  Trigger,
  EventBus
}

/** Components */
import DatePicker from "components/Component.DatePicker"
import Fotorama from "components/Component.Fotorama"
import Markdown from "components/Component.Markdown"
import Masonry from "components/Component.Masonry"
import Modal from "components/Component.Modal"
import Notifier from "components/Component.Notifier"
import Tabs from "components/Component.Tabs"
const Component = {
  DatePicker,
  Fotorama,
  Markdown,
  Masonry,
  Modal,
  Notifier,
  Tabs
}

/**Adapters */
import Toastr from "adapters/Adapter.Toastr"
import Showdown from "adapters/Adapter.Showdown"
const Adapter = {
  Toastr,
  Showdown
}

/** Modules */
import History from "modules/Module.History"
const Module = {
  History
}

var App = {
  behaviour: new Framework.Behaviour,
  trigger: new Framework.Trigger,
  eventBus: new Framework.EventBus,
  modules: {
    history: new Module.History({
      publish: function(options){
        App.eventBus.publish(options.channel, options.event, options.data);
      }
    })
  }
};

/** Finally, bootstrap the application */
function initApp() {
  var body = $('body');

  // Apply triggers once only to the body element.
  App.trigger.apply(body);
  //console.info('Applied triggers.');

  // Runs apply when the dom is ready.
  App.behaviour.apply(body);
  //console.info('Applied behaviours.');

  // Initialise jQuery's ajax with Rail's csrf token.
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
};

$(function(){ initApp(); })

App.behaviour.addFilters({
  'Component.DatePicker': {
    setup: function(element, options) {
      return new Component.DatePicker(element, options);
    }
  },
  'Component.Fotorama': {
    setup: function(element, options) {
      return new Component.Fotorama(element, options);
    }
  },
  'Component.Markdown': {
    setup: function(element, options) {
      return new Component.Markdown(element, options, new Adapter.Showdown);
    }
  },
  'Component.Masonry': {
    setup: function(element, options) {
      return new Component.Masonry(element, options, App.eventBus);
    }
  },
  'Component.Modal': {
    setup: function(element) {
      return new Component.Modal(element);
    }
  },
  'Component.Notifier': {
    setup: function() {
      return new Component.Notifier(Adapter.Toastr, App.eventBus);
    }
  },
  'Component.Tabs': {
    setup: function(element, options) {
      return new Component.Tabs(element, options);
    }
  }
});

// TRIGGERS
App.trigger.register('click', 'modal', function (e, element) {
  e.preventDefault();
  e.stopImmediatePropagation();
  $(element.attr('data-target')).modal('show');
});

// HISTORY
if(window.location.hash == '#_=_') {
  history.replaceState
    ? history.replaceState(null, null, window.location.href.split('#')[0])
    : window.location.hash = '';
}
