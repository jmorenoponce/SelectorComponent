'use strict';

import $ from "jquery";
import { SelectorManager } from './components/SelectorComponent/SelectorManager';


// Manager for both components
let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();

userSelectorComponent.bind('.ux-selector-users', {
    active: true,
    editable: true,
    dataSrc: './data-src/users-src.json'
});

console.log('This is de Manager Data... ', selectorManager);
console.log('And this de Selector Data... ', userSelectorComponent);

userSelectorComponent.init();


// // Another Selector Component for testing
// let anotherSelectorComponent = selectorManager.instanceNew();
//
// anotherSelectorComponent.bind(document.getElementsByClassName("app-another-selector"), {
//     // Example for some problems with a not valid config, course the component must show problem status.
//     active: true,
//     editable: true,
//     dataSrc: './data-src/this-file-not-exist.json'
// });
// anotherSelectorComponent.init();


// Some test for functionality
// console.log(selectorManager.id);
// console.log(selectorManager.instancesAmount);
// console.log(selectorManager.instancesObj);
