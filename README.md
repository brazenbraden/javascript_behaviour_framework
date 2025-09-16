# JavaScript Behaviour Framework

This repository contains a lightweight JavaScript behaviour framework originally developed in 2015 as part of the [JuggleBee](https://jugglebee.com) application. At the time, React and Vue were in their infancy, and jQuery was the most widely used utility for front-end interactivity.

The framework was designed to address a simple concern: apply JavaScript behaviours only to components that exist on the page, avoiding unnecessary script execution and improving maintainability.

---

## Core Concepts

The framework is composed of several small modules:

- **Framework.Behaviour** – attach modular behaviours to DOM elements via `data-behaviour`.
- **Framework.EventBus** – a pub/sub message bus for decoupled communication.
- **Framework.Trigger** – declarative DOM event delegation via `data-trigger`.
- **Adapters** – wrappers that normalise implementations (e.g. Toastr notifications) so they can be swapped without changing component logic.
- **Modules** – abstractions around browser APIs (e.g. History API) for consistent usage across the application.

A small set of utility libraries (`Class.js`, `Selectors.js`, `String.js`) provide class instantiation, selector extensions, and string helpers.

---

## Example

A simple tabs component:

```html
<div data-behaviour="Component.Tabs">
  <ul class="nav nav-tabs">
    <li><a href="#first">First tab</a></li>
    <li><a href="#second">Second tab</a></li>
  </ul>
</div>
```

```js
Component.Tabs = new Class({
  options: { tab$: '.nav > li > a' },
  init:function(element, options){
    this.setOptions(options);
    element.find(this.options.tab$).on('click', function(e){
      e.preventDefault();
      $(this).tab('show');
    });
  }
});
```

On `Framework.Behaviour.apply(document.body)`, the behaviour is automatically applied, binding the required interactions.

---

## Status

This framework remains in active use within JuggleBee but is **not recommended for new projects**. Modern frameworks (e.g. React, Vue, Stimulus) provide equivalent functionality with broader support.

This repository exists for **historical documentation** and reference purposes. For a detailed overview, see the accompanying blog post:
👉 [JavaScript Behaviour Framework: A Snapshot from 2015](https://www.brazenbraden.com/posts/javascript_behaviour_framework/)

---

## Credits

Originally developed for JuggleBee, with significant contributions from [Paul Schwarz](https://github.com/paulschwarz), who later published a refined standalone version as [bee](https://github.com/paulschwarz/bee).

