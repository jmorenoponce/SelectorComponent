'use strict';


export class Data_Handler {


	static _JSON_KEYS = {

		DATA: 'data'
	}


	constructor() {

		this._data = {};

		this._config_obj = {
			category_key: '',
			last_selected_ids: [],
			searchable_fields: [],

			/**
			 * Returns coincidence validation looking for <term> in all value keys of <item>.
			 * @param term
			 * @param item
			 * @returns {boolean}
			 */
			filter: function (term, item) { // ?? Searchable fields
				return item.first_name.toString().toLowerCase().includes((term)) ||
					item.last_name.toString().toLowerCase().includes((term)) ||
					item.department.toString().toLowerCase().includes((term));
			}
		};
	}


	/**
	 * Take de values from json data filling owner configuration keys.
	 *  <data> is a required global key for valid <data_src>.
	 * @param data_src
	 * @return {boolean}
	 */
	data_seed(data_src) {

		if (!data_src.hasOwnProperty(Data_Handler._JSON_KEYS.DATA)) {
			return false;
		}

		this._data = data_src[Data_Handler._JSON_KEYS.DATA];

		return true;
	}


	/**
	 * @param params
	 */
	set_config(params) {

		Object.assign(this._config_obj, params);
	}


	/**
	 * @param targetId
	 * @returns {*}
	 */
	get_by_id(targetId) {

		return this._data.find(item => item.id === targetId);
	}


	/**
	 * Returns an enumerated array containing the categories of data items.
	 * @returns {string[]}
	 */
	get_groups() {

		let groups = {};

		for (let item of this._data) {

			let group = item[this._config_obj.category_key];
			groups[group] = 1;
		}

		return Object.keys(groups);
	}


	list_reduce_to_key(key) {

		let list = [];

		for (let item of this._data) {

			list.push(item[key]);
		}

		return list;
	}

	list_reduce_to_key_unique(key) {

		let list = {};

		for (let item of this._data) {

			list[item[key]] = 1;
		}

		return Object.keys(list);
	}


	/**
	 * Returns the filtered item list (taking search term as filter seed).
	 * @param search_term
	 * @returns {[]}
	 */
	search(search_term) {

		let filtered = [];

		for (let item of this._data) {

			if (this._config_obj.filter.apply(null, [search_term, item])) {
				filtered.push(item);
			}
		}

		return filtered;
	}
}
