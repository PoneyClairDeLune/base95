# block95
🧐 Encode binary data with 9 on 11 base 95 block encoding.

This project is a response to [How the Great Firewall of China Detects and Blocks Fully Encrypted Traffic](https://gfw.report/publications/usenixsecurity23/en/), as the encoding scheme used in the project...

* All bytes are printable.
* If input can be considered fully random, the ratio of total 1s among all bits fluctuates around 47.5%.

## API
### `Block95`
#### `.encodeLength(length)`
Estimate encode length.

#### `.decodeLength(length)`
Estimate decode length.

#### `.encodeBlock(inputSlice, outputSlice)`
Encode a 9-byte (or less) block.

#### `.decodeBlock(inputSlice, outputSlice)`
Decode a 11-byte (or less) block.

#### `.encodeBytes(inputBuffer, outputBuffer)`
Encode `Uint8Array`.

#### `.decodeBytes(inputBuffer, outputBuffer)`
Decode `Uint8Array`.

#### `.encodeSync(inputBuffer, outputBuffer)`
Encode any of `ArrayBuffer` or `TypedArray`.

#### `.decodeSync(inputBuffer, outputBuffer)`
Encode any of `ArrayBuffer` or `TypedArray`.

#### `.encode(inputBuffer, outputBuffer)`
Async version of `.encodeSync`.

#### `.decode(inputBuffer, outputBuffer)`
Async version of `.decodeSync`.
