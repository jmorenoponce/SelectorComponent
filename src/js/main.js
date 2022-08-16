'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass} from "./components/Util/UtilityClass.js";


let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();
let userData = UtilityClass.loadFromFile('./dist/data-src/users-src.json');

userData.then(userData => {
    userSelectorComponent.bind('.ux-selector-users', userData, {
        isActive: true,
        isEditable: true,
        label: 'Selección de usuarios:',
        placeholder: 'Seleccionar usuarios...',
        searchingText: 'Buscando usuarios...',
        searchResultsNone: 'No se encontraron usuarios para esta búsqueda',
    });
    userSelectorComponent.init();
});


// Another Selector Component with errors for testing
let wrongSelectorComponent = selectorManager.instanceNew();
let anotherData = UtilityClass.loadFromFile('./dist/data-src/another-src.json');

anotherData.then(anotherData => {
    wrongSelectorComponent.bind('.ux-selector-another', anotherData, {
        isActive: true,		// => Wrong property
        isEditable: false,
        placeholder: '45'		// => Wrong type
    });
    wrongSelectorComponent.init();
});


// Some test for functionality
const wait = setTimeout(printInfo, 300);

function printInfo() {

    console.log('Created manager id: ', selectorManager.id);
    console.log('Components instances amount: ', selectorManager.instancesAmount);
    console.log('\n');

    const instancesObj = selectorManager.instancesObj;

    for (const instance of instancesObj) {
        console.log('#');
        console.log('Component: ', instance.id);
        console.log('Name: ', instance.name);
        console.log('State: ', instance.getStateMessage());
        console.log('Native value (To do): ', instance.getNativeValue());
        console.log('Object: ', instance);
        console.log('\n');

        console.log('Department list:', instance.getItemGroups());
        console.log('Looking for "anna":', instance.setSearchTerm('anna'));
        console.log('Looking for "rk":', instance.setSearchTerm('mark'));
        console.log('\n');
    }

    console.log('-');
    console.log('Looking for name property "anotherTypology": ', selectorManager.getInstanceByName('anotherTypology'));
    console.log('Looking for id property "' + userSelectorComponent.id + '": ', selectorManager.getInstanceById(userSelectorComponent.id));

    console.log('Sending action "hola" to', userSelectorComponent.id);
    console.log(selectorManager.sendInstanceAction(userSelectorComponent.id, 'hola'));

    console.log('-');

    userSelectorComponent.setSelection([1, 2, 3]);
    console.log('Selecting items [1, 2, 3]:', userSelectorComponent._selectedIds)

    userSelectorComponent._selectItem([4, 8, 22]);
    console.log('Selecting items [4, 8, 22]:', userSelectorComponent._selectedIds);

    userSelectorComponent._selectItem([9, 9, 9]);
    console.log('Selecting items [9, 9, 9]:', userSelectorComponent._selectedIds);

    userSelectorComponent._unselectItem([9, 22]);
    console.log('Unselecting items [9, 22]:', userSelectorComponent._selectedIds);

    userSelectorComponent._unselectAll();
    console.log('Unselecting all:', userSelectorComponent._selectedIds);

    console.log('Looking for Id [5]:', userSelectorComponent._data.getById(5));

    clearTimeout(wait);
}
