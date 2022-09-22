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


	/**
	 * @param tpl_id
	 * @param data
	 * @returns {*}
	 */
	static get(tpl_id, data) {

		if (!UI_Template_Handler._instance) {
			UI_Template_Handler._instance = new UI_Template_Handler();
			UI_Template_Handler._instance.load_tpl_file();
		}

		return UI_Template_Handler._instance.get_tpl_partial(tpl_id, data);
	}


	/**
	 * @param tpl_id
	 * @param data
	 * @return {*|jQuery.fn.init|jQuery|HTMLElement}
	 */
	static $get(tpl_id, data) {

		return $(UI_Template_Handler.get(tpl_id, data));
	}


	/**
	 *
	 * @param callback
	 */
	static on_loaded(callback) {

		if (!UI_Template_Handler._instance) {
			UI_Template_Handler._instance = new UI_Template_Handler();
		}

		UI_Template_Handler._instance.load_tpl_file(callback);
	}


	constructor() {

		this._tpl_collection = {};
		this._load_tpl_file();
	}


	/**
	 *
	 * @param callback
	 */
	load_tpl_file(callback) {

		this._load_tpl_file(callback);
	}


	/**
	 *
	 * @param partial_id
	 * @param data
	 * @return {*}
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

		$.get({
			url: _tmp_target,
			dataType: 'text'
		}).done((response) => {

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
