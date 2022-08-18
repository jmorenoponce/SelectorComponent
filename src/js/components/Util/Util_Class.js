'use strict';


import {v4 as uuidv4} from 'uuid';


export class Util_Class {


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


	testEnumerableDinamicMethod() {

		// This method is created for listing properties comparison
	}
}