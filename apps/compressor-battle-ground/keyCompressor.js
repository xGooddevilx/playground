const indexedKeys = new Set([]);

const getKey = (key) => Array.from(indexedKeys).indexOf(key);
const setKey = (key) => indexedKeys.add(key);

function getShortKey(key) {
    if (!indexedKeys.has(key)) {
        setKey(key);
    }
    return getKey(key);
}

function compress(data) {
    if (Array.isArray(data)) {
        return data.map(compress);
    } else if (data && typeof data === "object") {
        const newObj = {};
        for (const key in data) {
            const indexedKey = getShortKey(key);
            newObj[indexedKey] = compress(data[key]);
        }
        return newObj;
    }
    return data;
}

/**
 *
 * @param {Object} Object - The object to compress.
 * It recursively processes nested objects and arrays.
 * @returns {Object} - An object containing the compressed data and a keyMap. {keyMap: Array, compressed: Object}
 * @description This function compresses the keys of an object by replacing them with their index in a set of unique keys.
 */
function compressKeys(data) {
    const compressed = compress(data);
    const keyMap = Array.from(indexedKeys);

    return {
        compressed,
        keyMap,
    };
}


module.exports = compressKeys