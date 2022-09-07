'use strict';


export class Selector_Config {


	static _CONFIG_MAP = {

		category_key: {
			is_nullable: true,
			type: 'string',
			class: 'data',
		},
		last_selected_ids: {
			is_nullable: true,
			type: 'object',
			class: 'data',
		},
		is_active: {
			is_nullable: false,
			type: 'boolean',
			class: 'ui',
		},
		is_editable: {
			isNullable: false,
			type: 'boolean',
			class: 'ui',
		},
		placeholder: {
			isNullable: true,
			type: 'string',
			class: 'ui',
		},
		search_placeholder: {
			isNullable: true,
			type: 'string',
			class: 'ui',
		},
		searching_text: {
			isNullable: true,
			type: 'string',
			class: 'ui',
		},
		search_results_none: {
			isNullable: true,
			type: 'string',
			class: 'ui',
		},
		min_width: {
			isNullable: true,
			type: 'string',
			class: 'ui',
		},
		max_rows: {
			is_nullable: true,
			type: 'number',
			class: 'ui',
		}
	};


	static _CONFIG_DEFAULT = {

		category_key: null,
		last_selected_ids: null,
		is_active: true,
		is_editable: true,
		placeholder: 'Seleccionar...',
		search_placeholder: 'Buscar...',
		searching_text: 'Buscando...',
		search_results_none: 'No hay resultados para esta búsqueda',
		min_width: 'auto',
		max_rows: 10
	};


	constructor() {

		this._config_obj = {};

		this.data_params = {};
		this.ui_params = {};
	}


	/**
	 * Returns a new config object after validation process
	 * @param new_config
	 * @returns {boolean}
	 */
	assign(new_config) {

		let tmpConfig = {};

		$.extend(true, tmpConfig, Selector_Config._CONFIG_DEFAULT, new_config);

		if (!this._validate(tmpConfig)) {
			return false;
		}

		this._config_obj = tmpConfig;

		this._extract_params();

		return true;
	}


	/**
	 * Returns config validation response comparing the new object with a config mapping
	 * @param new_config
	 * @returns {boolean}
	 * @private
	 */
	_validate(new_config) {

		for (const key in Selector_Config._CONFIG_MAP) {

			const keySpec = Selector_Config._CONFIG_MAP[key];
			const entryVal = new_config[key];

			if (typeof entryVal !== keySpec.type) {
				return false;
			}
		}

		return true;
	}


	/**
	 * Pull apart Ui and Data parameters from config type of values
	 * @private
	 */
	_extract_params() {

		let tmpParams = {
			data: {},
			ui: {}
		};

		for (const key in this._config_obj) {

			const keyClass = Selector_Config._CONFIG_MAP[key].class;

			Object.assign(tmpParams[keyClass], {[key]: this._config_obj[key]});
		}

		Object.assign(this.data_params, tmpParams.data);
		Object.assign(this.ui_params, tmpParams.ui);
	}
}