'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass} from "./components/Util/UtilityClass.js";


// let util = new UtilityClass();
let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();
let userData = UtilityClass.loadFromFile('./dist/data-src/users-src.json');
console.log(userData);

userSelectorComponent.bind('.ux-selector-users', {
    active: true,
    editable: true,
    dataSrc: userData
});
userSelectorComponent.init();


// Another Selector Component for testing
let anotherSelectorComponent = selectorManager.instanceNew();
anotherSelectorComponent.bind('.ux-selector-another', {
    // Example for some problems with a not valid config, course the component must show problem status.
    active: false,
    editable: false,
    dataSrc: './dist/data-src/this-file-not-exist.json'
});
anotherSelectorComponent.init();


// // Some test for functionality
// console.log('[manager_id]...', selectorManager.id);
// console.log('[manager_amount_instances]...', selectorManager.instancesAmount);
// UtilityClass.print('Esto es una prueba', selectorManager.instancesObj);