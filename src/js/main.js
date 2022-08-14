'use strict';


import {SelectorManager} from './components/SelectorComponent/SelectorManager.js';
import {UtilityClass as Util} from "./components/Util/UtilityClass.js";


let selectorManager = new SelectorManager();


//  Users Selector Component
let userSelectorComponent = selectorManager.instanceNew();

let tmpId = userSelectorComponent.id; // Test functionality.

let userData = Util.loadFromFile('./dist/data-src/users-src.json');

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
let anotherData = Util.loadFromFile('./dist/data-src/another-src.json');

anotherData.then(anotherData => {
	wrongSelectorComponent.bind('.ux-selector-another', anotherData, {
		isActive: false,		// => Wrong property
		isEditable: false,
		placeholder: '45'		// => Wrong type
	});
	wrongSelectorComponent.init();
});


// Some test for functionality
const wait = setTimeout(printInfo, 500);

function printInfo() {

	console.log('Created manager id: ', selectorManager.id);
	console.log('Components instances amount: ', selectorManager.instancesAmount);
	console.log('\n');

	let instancesObj = selectorManager.instancesObj;

	for (const instance of instancesObj) {
		console.log('Component: ', instance.id);
		console.log('Name: ', instance.name);
		console.log('State: ', instance.getStateMessage());
		console.log('Native value: ', instance.getNativeValue());
		console.log('Object: ', instance);
		console.log('\n');

		console.log('Department list...', instance.getItemGroups());
		console.log('Looking for "anna"...', instance.setSearchTerm('anna'));
		console.log('Looking for "rk"...', instance.setSearchTerm('mark'));
		console.log('\n');
	}

	console.log('Looking for name property: ', selectorManager.getInstanceByName('anotherTypology'));
	console.log('Looking for id property: ', selectorManager.getInstanceById(tmpId));

	clearTimeout(wait);
}
