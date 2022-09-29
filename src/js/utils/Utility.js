'use strict';


import {v4 as uuidv4} from 'uuid';


export class Utility {

	static print(msg, ...result) {

		let _tmpMsg = [];

		_tmpMsg.push('[' + msg + ']');
		_tmpMsg.push(...result);

		console.log(_tmpMsg);
	}


	static load_from_file(path) {

		async function fetchData() {
			return await fetch(path)
				.then(response => response.json());
		}

		return fetchData();
	}


	static generate_uuid() {

		return uuidv4();
	}


	static take_name_initials(name) {

		return name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
	}


	static take_name_color() {


	}


	testEnumerableDinamicMethod() {

		// This method is created for listing properties comparison
	}
}