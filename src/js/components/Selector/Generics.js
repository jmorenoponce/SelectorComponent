'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";
import {Utility} from "../../utils/Utility";


export class Generics {


	init () {
		this.buttons();
	}

	buttons () {

		let _this = this;

		$('body').on('click', '.btn-group .btn', function (e) {
console.log('aa')
			_this._btn_click($(this));
		});

	}

	_btn_click ($btn) {

		let btn_group = $btn.closest('.btn-group');

		btn_group.find('.ui-active').removeClass('ui-active');
		$btn.addClass('ui-active');

	}
}