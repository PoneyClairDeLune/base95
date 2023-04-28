"use strict";

let typeCheck = function (variable, type, nullable = false) {
	if (!type && !nullable) {
		throw(new TypeError(`Type is not defined`));
	};
	if (variable?.constructor) {
		if (variable.constructor != type) {
			throw(new TypeError(`Value is not type ${type.name}`));
		};
	} else {
		if (!nullable) {
			throw(new TypeError(`Value is not nullable`));
		};
	};
};

export {
	typeCheck
};
