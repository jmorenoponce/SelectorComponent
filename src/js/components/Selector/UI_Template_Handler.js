'use strict';


import * as Handlebars from "handlebars";


export class UI_Template_Handler {


	static _tpl_path = './src/js/components/Selector/'
	static _tpl_base_file = 'UI_Templates.hbs';


	constructor() {

		this._tpl_collection = {};
		this._load_tpl_file();
	}


	/**
	 *
	 * @param partial_id
	 * @returns {*}
	 */
	get_tpl_partial(partial_id) {

		return this._tpl_collection[partial_id];
	}


	/**
	 *
	 * @private
	 */
	_load_tpl_file() {

		const _tmp_target = UI_Template_Handler._tpl_path + UI_Template_Handler._tpl_base_file;

		$.get(_tmp_target).done((response) => {

			let tmpCollection = $(response).filter('[type="text/x-handlebars-template"]');

			tmpCollection.each((k, v) => {

				this._tpl_collection[$(v).attr('id')] = this._compile($(v).html());
			});
		});
	}


	/**
	 * Returns a compiled concrete partial from template collection
	 * @param plain_html
	 * @returns {HandlebarsTemplateDelegate<any>}
	 */
	_compile(plain_html) {

		return Handlebars.compile(plain_html);
	}
}
