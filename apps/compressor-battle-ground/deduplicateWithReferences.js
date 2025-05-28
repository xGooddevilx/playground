function deduplicateWithReferences(obj) {
  const seen = new Map();
  let idCounter = 1;

  function hash(value) {
    return JSON.stringify(value);
  }

  function traverse(value) {
    if (Array.isArray(value)) {
      return value.map(traverse);
    } else if (value && typeof value === 'object') {
      const clone = {};
      for (const key in value) {
        clone[key] = traverse(value[key]);
      }

      const h = hash(clone);
      if (seen.has(h)) {
        return { $ref: seen.get(h) };
      } else {
        const refId = `$id${idCounter++}`;
        seen.set(h, refId);
        return { $id: refId, ...clone };
      }
    }
    return value;
  }

  return traverse(obj);
}
exports.deduplicateWithReferences = deduplicateWithReferences;
