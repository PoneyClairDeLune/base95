"use strict";

let toByteArray = function (buffer) {
	let byteArr;
	switch (buffer?.constructor) {
		case Uint8Array: {
			byteArr = buffer;
			break;
		};
		case Int8Array:
		case Uint8ClampedArray:
		case Int16Array:
		case Uint16Array:
		case Int32Array:
		case Uint32Array:
		case Float32Array:
		case BigInt64Array:
		case BigUint64Array:
		case Float64Array: {
			byteArr = new Uint8Array(buffer.buffer, buffer.buffer.byteOffset, buffer.buffer.byteLength);
		};
		default: {
			throw(new TypeError(`Unaccepted type for conversion`));
		};
	};
	return byteArr;
};

export {
	toByteArray
};
