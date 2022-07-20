'use strict';

import $ from "jquery";


let selectorManager = new SelectorManager();
console.log(selectorManager.getId());


// Users Selector Component
let userSelectorComponent = selectorManager.newInstance();
userSelectorComponent.bind($('.app-user-selector'), {
    active: true,
    searchable: true,
    dataSrc: './data-src/users-src.json'
});
userSelectorComponent.init();



//
//
// // Another Selector Component for testing
// let AnotherSelectorComponent = SelectorManager.newInstance();
//
// AnotherSelectorComponent.bind(document.getElementsByClassName("app-another-selector"), {
//     // Example for some problems with a not valid config, course the component must show problem status.
//     active: true,
//     searchable: false,
//     dataSrc: './data-src/this-file-not-exist.json'
// });
// AnotherSelectorComponent.init();
