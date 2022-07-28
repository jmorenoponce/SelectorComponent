'use strict';


export class SelectorConfig {


	constructor() {

		this.KEY_CODES = this._keyCodes;
		this.DEFAULT_CONFIG = this._defaultConfig;
	}


	_defaultConfig() {

		return {
			isActive: true,
			isEditable: true,
			caption: 'Selección:',
			placeholder: 'Seleccionar...',
			searchPlaceholder: 'Buscar...',
			searchingText: 'Buscando...',
			searchNoResults: 'No hay resultados para esta búsqueda',
			dataSrc: {}
		};
	}


	_keyCodes() {

		return {
			BACKSPACE: 8,
			TAB: 9,
			ENTER: 13,
			SHIFT: 16,
			CTRL: 17,
			ALT: 18,
			ESC: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			DELETE: 46
		};
	}
}
