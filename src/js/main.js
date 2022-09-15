'use strict';


import {Selector_Manager} from './components/Selector/Selector_Manager';
import {Utility} from "./utils/Utility";
import {UI_Manager} from "./components/Selector/UI_Handler";


let manager = new Selector_Manager();


//  Users Selector Component
let userSelector = manager.instance_create();
let userData = Utility.load_from_file('./dist/data-src/users-src.json');

userData.then(userData => {
	userSelector.bind('.ux-selector-users', userData, {
		category_key: 'department',
		last_selected_ids: [3, 20, 35, 48, 54, 8],
		is_active: true,
		is_editable: true,
		placeholder: 'Seleccionar usuarios...',
		searching_text: 'Buscando usuarios...',
		search_results_none: 'No se encontraron usuarios para esta búsqueda',
	});
	userSelector.init();
});


// // Another Selector Component with errors for testing
// let wrongSelector = manager.instance_create();
// let anotherData = Utility.load_from_file('./dist/data-src/another-src.json');
//
// anotherData.then(anotherData => {
//
// 	wrongSelector.bind('.ux-selector-another', anotherData, {
// 		category_key: 'department',
// 		is_active: true, 		// => Wrong property
// 		is_editable: false,
// 		placeholder: '45'	    	// => Wrong type
// 	});
// 	wrongSelector.init();
// });


// Some test for functionality
const wait = setTimeout(printInfo, 300);

function printInfo() {

	console.log('Created manager id: ', manager.id);
	console.log('Components instances amount: ', manager.instances_amount);
	console.log('\n');

	const instances_obj = manager.instances_obj;

	for (const instance of instances_obj) {
		console.log('#');

		console.log('Component: ', instance.id);
		console.log('Name: ', instance.name);
		console.log('State: ', instance.get_state_msg());

		if (!instance.is_valid_state()) {
			continue;
		}

		console.log('Native value (To do): ', instance.get_native_value());
		console.log('Object: ', instance);
		console.log('\n');

		console.log('Department list:', instance.get_item_groups());
		console.log('Looking for "anna":', instance.set_search_term('anna'));
		console.log('Looking for "rk":', instance.set_search_term('mark'));
		console.log('\n');
	}

	console.log('-');
	console.log('Looking for name property "usersByDepartment": ', manager.get_instance_by_name('usersByDepartment'));
	console.log('Looking for id property "' + userSelector.id + '": ', manager.get_instance_by_id(userSelector.id));

	console.log('Sending action "hola" to', userSelector.id);
	console.log(manager.send_instance_action(userSelector.id, 'hola'));

	console.log('-');

	userSelector.set_selection([1, 2, 3]);
	console.log('Selecting items [1, 2, 3]:', userSelector._selected_ids);

	userSelector.select_item([4, 8, 22]);
	console.log('Selecting items [4, 8, 22]:', userSelector._selected_ids);

	userSelector.select_item([9, 9, 9]);
	console.log('Selecting items [9, 9, 9]:', userSelector._selected_ids);

	userSelector.unselect_item([9, 22]);
	console.log('Unselecting items [9, 22]:', userSelector._selected_ids);

	userSelector.unselect_all();
	console.log('Unselecting all:', userSelector._selected_ids);

	console.log('Looking for Id [5]:', userSelector._data_handler.get_by_id(5));

	clearTimeout(wait);
}
