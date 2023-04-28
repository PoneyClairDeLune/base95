"use strict";

// KORG 8 on 7 codec

import {typeCheck} from "./typeCheck.js";
import {toByteArray} from "./utils.js";

let windowMove = function (inBuf, inBufWin = 1, outBuf, outBufWin = 1, callback) {
	typeCheck(inBuf, Uint8Array);
	typeCheck(outBuf, Uint8Array);
	typeCheck(inBufWin, Number);
	typeCheck(outBufWin, Number);
	for (let inPtr = 0, outPtr = 0; inPtr < inBuf.length; inPtr += inBufWin, outPtr += outBufWin) {
		callback(inBuf.subarray(inPtr, inPtr + inBufWin), outBuf.subarray(outPtr, outPtr + outBufWin));
	};
};

let Block95 = class {
	static chunkSizeEnc = 9;
	static chunkSizeDec = 11;
	static encodeLength(length) {
		typeCheck(length, Number);
		return Math.ceil(length * this.chunkSizeDec / this.chunkSizeEnc);
	};
	static decodeLength(length) {
		typeCheck(length, Number);
		return Math.floor(length * this.chunkSizeEnc / this.chunkSizeDec);
	};
	static encodeBlock(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		let encodeLength = this.encodeLength(source.length);
		if (source.length > this.chunkSizeEnc) {
			throw(new Error(`Source (${source.length}) is greater than ${this.chunkSizeEnc} bytes`));
		};
		if (target.length < encodeLength) {
			throw(new Error(`Target (${target.length}) isn't sufficient for encoding`));
		};
		encodeLength = BigInt(encodeLength);
		let blockVal = 0n;
		source.forEach((e, i) => {
			blockVal |= BigInt(e) << (BigInt(i) << 3n);
		});
		for (let i = 0n; i < encodeLength; i ++) {
			target[i] = Number(blockVal % 95n + 32n);
			blockVal /= 95n;
		};
	};
	static decodeBlock(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		let decodeLength = this.decodeLength(source.length);
		if (source.length > this.chunkSizeDec) {
			throw(new Error(`Source (${source.length}) is greater than ${this.chunkSizeEnc} bytes`));
		};
		if (target.length < decodeLength) {
			throw(new Error(`Target (${target.length}) isn't sufficient for decoding`));
		};
		decodeLength = BigInt(decodeLength);
		let blockVal = 0n;
		source.forEach((e, i) => {
			blockVal += (BigInt(e) - 32n) * (95n ** BigInt(i));
		});
		for (let i = 0n; i < decodeLength; i ++) {
			target[i] = Number(blockVal & 255n);
			blockVal = blockVal >> 8n;
		};
	};
	static encodeBytes(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (target.length < this.encodeLength(source.length)) {
			throw(new Error(`Target isn't sufficient for encoding`));
		};
		windowMove(source, this.chunkSizeEnc, target, this.chunkSizeDec, (s, t) => {
			this.encodeBlock(s, t);
		});
	};
	static decodeBytes(source, target) {
		typeCheck(source, Uint8Array);
		typeCheck(target, Uint8Array);
		if (target.length < this.decodeLength(source.length)) {
			throw(new Error(`Target isn't sufficient for decoding`));
		};
		windowMove(source, this.chunkSizeDec, target, this.chunkSizeEnc, (s, t) => {
			this.decodeBlock(s, t);
		});
	};
	static encodeSync(source, target) {
		this.encodeBytes(toByteArray(source), toByteArray(target));
	};
	static decodeSync(source, target) {
		this.decodeBytes(toByteArray(source), toByteArray(target));
	};
	static async encode(source, target) {
		this.encodeBytes(toByteArray(source), toByteArray(target));
	};
	static async decode(source, target) {
		this.decodeBytes(toByteArray(source), toByteArray(target));
	};
};

export {
	Block95
};
