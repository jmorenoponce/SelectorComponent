'use strict';


export class SelectorUiConfig {


	static _CONFIG_DEFAULT = {

		isActive: true,
		isEditable: true,
		label: 'Selección:',
		placeholder: 'Seleccionar...',
		searchPlaceholder: 'Buscar...',
		searchingText: 'Buscando...',
		searchResultsNone: 'No hay resultados para esta búsqueda',
		minWidth: 'auto',
		maxRows: 10
	};


	static _CONFIG_MAP = {

		isActive: {
			isNullable: false,
			type: 'boolean',
		},
		isEditable: {
			isNullable: false,
			type: 'boolean',
		},
		label: {
			isNullable: true,
			type: 'string',
		},
		placeholder: {
			isNullable: true,
			type: 'string',
		},
		searchPlaceholder: {
			isNullable: true,
			type: 'string',
		},
		searchingText: {
			isNullable: true,
			type: 'string',
		},
		searchResultsNone: {
			isNullable: true,
			type: 'string',
		},
		minWidth: {
			isNullable: true,
			type: 'string',
		},
		maxRows: {
			isNullable: true,
			type: 'number',
		}
	};


	constructor() {

		this.configObj = {};
		this._isValid = false;
	}


	/**
	 * Returns a new config object after validation process
	 * @param newConfig
	 */
	assign(newConfig) {

		let tmpConfig = {};

		$.extend(true, tmpConfig, SelectorUiConfig._CONFIG_DEFAULT, newConfig);

		if (this._validate(tmpConfig)) {
			this._isValid = true;
		}

		this.configObj = tmpConfig;
	}


	/**
	 * Returns config validation response comparing the new object with config map
	 * @param newConfig
	 * @returns {boolean}
	 * @private
	 */
	_validate(newConfig) {

		for (const key in SelectorUiConfig._CONFIG_MAP) {

			const keySpec = SelectorUiConfig._CONFIG_MAP[key];
			const entryVal = newConfig[key];

			if (typeof entryVal !== keySpec.type) {
				return false;
			}

			if (keySpec.isNullable && entryVal === null) {
				return false;
			}
		}

		return true;
	}


	isValid() {

		return this._isValid;
	}
}
