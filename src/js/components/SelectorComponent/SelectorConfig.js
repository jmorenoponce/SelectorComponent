'use strict';


export class SelectorConfig {


	constructor() {

		this.STATES = this._states();
		this.PATTERN_CONFIG = this._patternConfig();
		this.DEFAULT_CONFIG = this._defaultConfig();
		this.KEY_CODES = this._keyCodes();
	}


	_states() {

		return {
			// Informational
			WAITING_FOR_BINDING: 100,

			// Successful
			BINDED: 200,
			RUNNING: 210,
			STOPPED: 220,
			FINISHED: 230,

			// Error
			INVALID_CONFIG_OBJECT: 400,
			UNKNOWN_SOURCE_DATA: 410,
			INVALID_SOURCE_DATA: 420,

			// Other
			UNKNOWN_PROBLEM: 900
		}
	}


	validateConfig(configObj) {

		console.log('Objeto de configuración: ', configObj);

		return true;
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
			singularModelName: {
				isNullable: true,
				type: String,
				defaultValue: 'Usuario/a'
			},
			pluralModelName: {
				isNullable: true,
				type: String,
				defaultValue: 'Usuarios/as'
			},
			label: {
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
			dataSource: {
				isNullable: false,
				type: Object,
				defaultValue: this.STATES.UNKNOWN_SOURCE_DATA
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
