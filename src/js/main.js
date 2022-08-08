'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass as Util} from "./components/Util/UtilityClass.js";


let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();
let userData = Util.loadFromFile('./dist/data-src/users-src.json');

userData.then(userData => {
    userSelectorComponent.bind('.ux-selector-users', {
        isActive: true,
        isEditable: true,
        label: 'Selección de usuarios:',
        placeholder: 'Seleccionar usuarios...',
        searchingText: 'Buscando usuarios...',
        searchResultsNone: 'No se encontraron usuarios para esta búsqueda',
        dataSource: userData
    });
    console.log(userSelectorComponent.parentManagerId, userSelectorComponent.id, userSelectorComponent.init());
});


// Another Selector Component with errors for testing
let wrongSelectorComponent = selectorManager.instanceNew();
let anotherData = Util.loadFromFile('./dist/data-src/another-src.json');

anotherData.then(anotherData => {
    wrongSelectorComponent.bind('.ux-selector-another', {
        isActive: true,            // => Wrong property
        isEditable: false,
        placeholder: '45',            // => Wrong type
        dataSource: anotherData
    });
    console.log(userSelectorComponent.parentManagerId, wrongSelectorComponent.id, wrongSelectorComponent.init());
});


// Some test for functionality
const wait = setTimeout(printInfo, 1000);

function printInfo() {

    console.log('manager_id...', selectorManager.id);
    console.log('manager_amount_instances...', selectorManager.instancesAmount);
    console.log('component_state...', userSelectorComponent.id, userSelectorComponent.state);
    console.log('component_state...', wrongSelectorComponent.id, wrongSelectorComponent.state);

    console.log('manager_instances_object...', selectorManager.instancesObj);

    clearTimeout(wait);
}