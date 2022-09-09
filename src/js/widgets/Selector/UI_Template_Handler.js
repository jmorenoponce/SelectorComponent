'use strict';


import * as Handlebars from "handlebars";


export class UI_Template_Handler {


	static _TPL_PATH = './src/js/widgets/Selector/'
	static _TPL_BASE_FILE = 'UI_Templates.hbs';


	constructor() {

		this._tpl_base = this._load_tpl_file()
		this._tpl_collect = this._get_tpl_collect();

		this._init();
	}


	/**
	 *
	 * @param partial_id
	 * @param json_data
	 * @returns {HandlebarsTemplateDelegate<any>}
	 */
	compile(partial_id, json_data) {

		let tmp_partial = this.get_tpl_partial(partial_id)

		return Handlebars.compile(tmp_partial(json_data));
	}


	/**
	 *
	 * @private
	 */
	_init() {

		console.log(this._tpl_base);
		console.log(this._tpl_collect);
	}


	/**
	 *
	 * @private
	 */
	_load_tpl_file() {

		let _this = this;
		let _tmp_target = UI_Template_Handler._TPL_PATH + UI_Template_Handler._TPL_BASE_FILE;

		$.get(_tmp_target).done((response) => {

			_this._tpl_base = $($.parseHTML(response));
		});
	}


	/**
	 *
	 * @private
	 */
	_get_tpl_collect() {

		let _this = this;

		setTimeout(() => {

			_this._tpl_collect = this._tpl_base.filter('script[type="text/x-handlebars-template"]');

		}, 500);
	}


	/**
	 *
	 * @param partial_id
	 * @returns {*|jQuery}
	 * @private
	 */
	get_tpl_partial(partial_id) {

		return this._tpl_collect.filter(partial_id).html();
	}


	// cosas() {
	//
	// 	$.get('./src/js/widgets/Selector/UI_Templates.hbs').done(function (response) {
	//
	// 		let content = $($.parseHTML(response));
	// 		let compiled_tpl = Handlebars.compile(content.filter('#test-template').html())
	//
	// 		console.log(compiled_tpl({cosas: 'mías'}))
	// 	});
	// }


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
