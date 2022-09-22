'use strict';


import {Selector_Core} from "./components/Selector/Selector_Core";
import {UI_Template_Handler} from "./components/Selector/UI_Template_Handler";
import {Utility} from "./utils/Utility";


UI_Template_Handler.on_loaded(function () {

	//  Users Selector Component
	let userSelector = new Selector_Core($('#userSelector'), {
		category_key: 'department',
		last_selected_ids: [3, 20, 35, 48, 54, 8],
		is_active: true,
		is_editable: true,
		placeholder: 'Seleccionar usuarios...',
		searching_text: 'Buscando usuarios...',
		search_results_none: 'No se encontraron usuarios para esta búsqueda',
	});

	let userData = Utility.load_from_file('./dist/data-src/users-src.json');

	userData.then(userData => {
		userSelector.set_data(userData.data);
		userSelector.init();
	});
});
