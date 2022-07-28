'use strict';


export class SelectorConfig {


	constructor() {

		this.PATTERN_CONFIG = this._patternConfig();
		this.DEFAULT_CONFIG = this._defaultConfig;
		this.KEY_CODES = this._keyCodes;
	}


	_defaultConfig() {

	}


	_patternConfig() {

		return {
			isActive: {
				isNullable: true,
				type: Boolean,
				defaultValue: true
			},
			isEditable: {
				isNullable: true,
				type: Boolean,
				defaultValue: true
			},
			caption: {
				isNullable: true,
				type: String,
				defaultValue: 'Selección:'
			},
			placeholder: {
				isNullable: true,
				type: String,
				defaultValue: 'Seleccionar...',
			},
			searchPlaceholder: {
				isNullable: true,
				type: String,
				defaultValue: 'Buscar...',
			},
			searchingText: {
				isNullable: true,
				type: String,
				defaultValue: 'Buscando...',
			},
			searchResultsNone: {
				isNullable: true,
				type: String,
				defaultValue:  'No hay resultados para esta búsqueda',
			},
			dataSrc: {
				isNullable: false,
				type: Object,
				defaultValue: false
			}
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
