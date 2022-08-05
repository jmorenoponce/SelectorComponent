'use strict';


export class SelectorConfig {


	constructor() {

		this.configObj = {};

		this.STATES = this._states();
		this._PATTERN_CONFIG = this._patternConfig();
	}


	assignConfig(newConfig) {

		let _tmpResponse = this._validateConfig(newConfig);

		if (typeof _tmpResponse !== 'object')
			return this.STATES.INVALID_CONFIG_OBJECT;

		return this.configObj = Object.assign(_tmpResponse);
	}


	_validateConfig(configObj) {

		let _newConfig = {};
		let _entries = Object.entries(this._PATTERN_CONFIG);
		let _errorCode = false;

		for (const _parts of _entries) {

			let [_key, _values] = _parts;
			let _newValue = null;

			if (!Object.keys(configObj).includes(_key)) {

				if (!_values.isNullable)
					return _errorCode = this.STATES.INVALID_CONFIG_OBJECT;

				_newValue = _values.defaultValue;
			} else {

				if (typeof configObj[_key] !== _values.type.name.toLowerCase())
					return _errorCode = this.STATES.INVALID_CONFIG_OBJECT;

				_newValue = configObj[_key];
			}

			Object.assign(_newConfig, {[_key]: _newValue});
		}

		return !_errorCode ? _newConfig : _errorCode;
	}


	_states() {

		return {
			// Informative
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


	_patternConfig() {

		return {
			isActive: {
				isNullable: false,
				type: Boolean,
				defaultValue: true
			},
			isEditable: {
				isNullable: false,
				type: Boolean,
				defaultValue: true
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
				defaultValue: 'No hay resultados para esta búsqueda',
			},
			minWidth: {
				isNullable: true,
				type: String,
				defaultValue: 'auto'
			},
			maxRows: {
				isNullable: true,
				type: Number,
				defaultValue: 10
			},
			dataSource: {
				isNullable: false,
				type: Object,
				defaultValue: this.STATES.UNKNOWN_SOURCE_DATA
			}
		};
	}


	_defaultConfig() {

		let _tmpConfig = {};

		Object.entries(this._patternConfig()).forEach(item => {
			Object.assign(_tmpConfig, {[item[0]]: item[1].defaultValue});
		});

		return _tmpConfig;
	}
}
