'use strict';


import {UI_Template_Handler} from "./components/Selector/UI_Template_Handler";
import {Selector_Core} from "./components/Selector/Selector_Core";
import {Utility} from "./utils/Utility";


UI_Template_Handler.on_loaded(function () {

	let userSelector = new Selector_Core($('#userSelector'), {
		category_key: 'department',
		searchable_fields: [
			'first_name',
			'last_name',
			"department"
		],
		last_selected_ids: [3, 20, 35, 48, 54, 8],
		is_active: true,
		is_editable: true,
		placeholder: 'Seleccionar usuarios...',
		searching_text: 'Buscar usuarios...',
		search_results_none: 'No se encontraron usuarios para esta búsqueda',
	});

	let userData = Utility.load_from_file('./dist/data-src/users-src.json');

	userData.then(userData => {
		userSelector.set_data(userData.data);
		userSelector.init();
	});
});
