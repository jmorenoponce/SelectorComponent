'use strict';


import * as Handlebars from "handlebars";


export class UI_Template_Handler {


	static _tpl_path = './src/js/components/Selector/'
	static _tpl_base_file = 'UI_Templates.hbs';

	/**
	 * @type {UI_Template_Handler|boolean}
	 * @private
	 */
	static _instance = false;


	static get (tpl_id, data) {

		if (!UI_Template_Handler._instance) {
			UI_Template_Handler._instance = new UI_Template_Handler();
		}

		UI_Template_Handler._instance.loadTpls();

		return UI_Template_Handler._instance.get_tpl_partial(tpl_id, data);
	}

	static $get (tpl_id, data) {

		return $(UI_Template_Handler.get(tpl_id, data));
	}

	static onLoaded (f) {

		if (!UI_Template_Handler._instance) {
			UI_Template_Handler._instance = new UI_Template_Handler();
		}

		UI_Template_Handler._instance.loadTpls(f);
	}


	constructor() {

		this._tpl_collection = {};
		this._load_tpl_file();
	}


	loadTpls (callback) {
		this._load_tpl_file(callback);
	}

	/**
	 *
	 * @param partial_id
	 * @returns {*}
	 */
	get_tpl_partial(partial_id, data) {

		return this._tpl_collection[partial_id](data);
	}


	/**
	 *
	 * @private
	 */
	_load_tpl_file(callback) {

		const _tmp_target = UI_Template_Handler._tpl_path + UI_Template_Handler._tpl_base_file;

		$.get(_tmp_target).done((response) => {

			let tmpCollection = $(response).filter('[type="text/x-handlebars-template"]');

			tmpCollection.each((k, v) => {

				this._tpl_collection[$(v).attr('id')] = this._compile($(v).html());
			});

			callback && callback();
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
