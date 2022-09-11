'use strict';


import * as Handlebars from "handlebars";


export class UI_Template_Handler {


	static _TPL_PATH = './src/js/widgets/Selector/'
	static _TPL_BASE_FILE = 'UI_Templates.hbs';


	constructor(callback) {

		this._tpl_collection = {};

		this._load_tpl_file(callback);
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
	_load_tpl_file(callback) {

		const _tmp_target = UI_Template_Handler._TPL_PATH + UI_Template_Handler._TPL_BASE_FILE;

		$.get(_tmp_target).done((response) => {

			let tmpCollection = $(response).filter('[type="text/x-handlebars-template"]');

			tmpCollection.each((k, v) => {

				Object.assign(this._tpl_collection, {
					[$(v).attr('id')]: this._compile($(v).html())
				});
			});

			callback();
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


	// /**
	//  * This is only another try but with Ajax
	//  * @param path
	//  * @param template_key
	//  * @param jsonData
	//  * @returns {jQuery|{getAllResponseHeaders: (function(): *), abort: (function(*=): jqXHR), setRequestHeader: (function(*=, *): jqXHR), readyState: number, getResponseHeader: (function(*): *), overrideMimeType: (function(*): jqXHR), statusCode: (function(*=): jqXHR)}|HTMLElement|(function(*=, *=): *)|(function(*=, *=): *)|{getAllResponseHeaders: (function(): *), abort: (function(*=): jqXHR), setRequestHeader: (function(*=, *): jqXHR), readyState: number, getResponseHeader: (function(*): *), overrideMimeType: (function(*): jqXHR), statusCode: (function(*=): jqXHR)}}
	//  */
	// get_template_ajax(path, template_key, jsonData) {
	//
	// 	let source;
	// 	let template;
	//
	// 	return $.ajax({
	// 		url: path,
	// 		cache: true,
	// 		success: function (data) {
	// 			source = data
	// 			template = Handlebars.compile(source);
	// 			$(template_key).html(template(jsonData));
	// 		}
	// 	});
	// }
}
