'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass as Util} from "./components/Util/UtilityClass.js";


let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();
let userData = Util.loadFromFile('./dist/data-src/users-src.json');

userData.then(json => {

    userSelectorComponent.bind('.ux-selector-users', {
        isActive: true,
        label: 'Selección de usuarios:',
        placeholder: 'Seleccionar usuarios...',
        searchingText: 'Buscando usuarios...',
        searchResultsNone: 'No se encontraron usuarios para esta búsqueda',
        dataSource: json
    });
    userSelectorComponent.init();
});


// // Another Selector Component for testing
// let wrongSelectorComponent = selectorManager.instanceNew();
// let anotherData = Util.loadFromFile('./dist/data-src/file-not-exists-src.json');
//
// anotherData.then(json => {
//
//     wrongSelectorComponent.bind('.ux-selector-another', {
//         isActiv: true,      // => Wrong property
//         placeholder: 45,    // => Wrong type
//         dataSource: json    // => Invalid source data
//     });
//     wrongSelectorComponent.init();
// });

// // Some test for functionality
// console.log('[manager_id]...', selectorManager.id);
// console.log('[manager_amount_instances]...', selectorManager.instancesAmount);
// Util.print('Esto es una prueba', selectorManager.instancesObj);
