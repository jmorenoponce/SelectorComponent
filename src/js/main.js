'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass as Util} from "./components/Util/UtilityClass.js";


// let util = new UtilityClass();
let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();
let userData = Util.loadFromFile('./dist/data-src/users-src.json');

userData.then(value => {
    userSelectorComponent.bind('.ux-selector-users', {
        active: true,
        editable: true,
        dataSrc: value
    });
    userSelectorComponent.init();
});


// Another Selector Component for testing
let anotherSelectorComponent = selectorManager.instanceNew();
let anotherData = Util.loadFromFile('./dist/data-src/file-not-exists-src.json');

anotherData.then(value => {
    anotherSelectorComponent.bind('.ux-selector-another', {
        // Example for some problems with a not valid config,
        // the file not exists, and component must show problem status.
        active: false,
        editable: false,
        dataSrc: value
    });
    anotherSelectorComponent.init();
})


// Some test for functionality
console.log('[manager_id]...', selectorManager.id);
console.log('[manager_amount_instances]...', selectorManager.instancesAmount);
Util.print('Esto es una prueba', selectorManager.instancesObj);