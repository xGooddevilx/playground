const { stringify } = require("flatted");
const zlib = require("zlib");
const devalue = require("devalue");
const fs = require("fs");
const compressKeys = require("./keyCompressor");
const longObject = require("./ssr-context.js");
// const longObject = require("./dummy-data.js");


console.log(
  "Original Object Byte Size:",
  Buffer.byteLength(JSON.stringify(longObject), "utf8") / 1000,
  "kb"
);
console.log("Original Object Length:", JSON.stringify(longObject).length);
console.log("-----------------------");
console.group("Compression Results :");

const compressedByJSON = JSON.stringify(longObject);
console.group("JSON Compression");
console.log("-----------------------");
fs.writeFileSync("./result/json.json", compressedByJSON);
console.log(
  "Byte size of compressed JSON:",
  Buffer.byteLength(compressedByJSON, "utf8"),
  "bytes"
);
console.log("Length of compressed JSON:", compressedByJSON.length);
console.groupEnd();
console.log("-----------------------");

// ////////////////////////////////////////

console.group("Flatted Compression");
console.log("-----------------------");
console.time("flatted");
const compressedByFlatted = stringify(longObject);
console.timeEnd("flatted");
fs.writeFileSync("./result/flatted.json", compressedByFlatted);
console.log(
  "Byte size of compressed Flatted:",
  Buffer.byteLength(compressedByFlatted, "utf8"),
  "bytes"
);
console.log("Length of compressed Flatted:", compressedByFlatted.length);
console.groupEnd();
console.log("-----------------------");

// ////////////////////////////////////////

console.group("Devalue Compression");
console.log("-----------------------");
console.time("devalue");
const compressedByDevalue = devalue.stringify(longObject);
console.timeEnd("devalue");
fs.writeFileSync("./result/devalue.json", compressedByDevalue);
console.log(
  "Byte size of compressed Devalue:",
  Buffer.byteLength(compressedByDevalue, "utf8"),
  "bytes"
);
console.log("Length of compressed Devalue:", compressedByDevalue.length);
console.groupEnd();
console.log("-----------------------");

// ////////////////////////////////////////

const options = {
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
  },
};

console.group("Custom Key Compression");
console.log("-----------------------");
console.time("keys");
const compressedByKeys = compressKeys(longObject);
console.timeEnd("keys");
fs.writeFileSync("./result/keys.json", JSON.stringify(compressedByKeys));
console.log(
  "Byte size of compressed Custom Keys:",
  Buffer.byteLength(JSON.stringify(compressedByKeys), "utf8"),
  "bytes"
);
console.log(
  "Length of compressed Custom Keys:",
  JSON.stringify(compressedByKeys).length
);
console.groupEnd();
console.log("-----------------------");

// ////////////////////////////////////////

console.group("Gzip compression");
console.log("-----------------------");
console.time("zlib");
const data = JSON.stringify(longObject);
const compressedByZlib = zlib.gzipSync(data, { level: 2 });
console.timeEnd("zlib");
fs.writeFileSync("./result/zlibGzip.json", JSON.stringify(compressedByZlib));
console.log(
  "Byte size of compressed zlib:",
  Buffer.byteLength(JSON.stringify(compressedByZlib), "utf8"),
  "bytes"
);
console.log(
  "Length of compressed zlib:",
  JSON.stringify(compressedByZlib).length
);
console.groupEnd();
console.log("-----------------------");

console.group("Gzip compression Brotli");
console.log("-----------------------");
console.time("zlibBrotli");
const compressedByZlibBrotli = zlib.brotliCompressSync(data, options);
console.timeEnd("zlibBrotli");
fs.writeFileSync("./result/zlibBrotli.json", JSON.stringify(compressedByZlibBrotli));
console.log(
  "Byte size of compressed zlib:",
  Buffer.byteLength(JSON.stringify(compressedByZlibBrotli), "utf8"),
  "bytes"
);
console.log(
  "Length of compressed zlib:",
  JSON.stringify(compressedByZlibBrotli).length
);
console.groupEnd();
console.log("-----------------------");

console.time('decompressBrotli');
const meow = zlib.brotliDecompressSync(compressedByZlibBrotli);
console.timeEnd('decompressBrotli')

fs.writeFileSync('./result/decompressedBrotli.json',meow)