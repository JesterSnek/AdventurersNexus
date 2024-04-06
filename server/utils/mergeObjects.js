function mergeArrays(predefined, user) {
  const maxLength = Math.max(predefined.length, user.length);
  return Array.from({ length: maxLength }).map((_, i) => {
    if (
      user[i] &&
      predefined[i] &&
      typeof predefined[i] === "object" &&
      typeof user[i] === "object"
    ) {
      // If there's a corresponding user object, merge them
      return mergeObjects(predefined[i], user[i]);
    } else {
      // If there's no corresponding user item or the items are not objects, use the user item if it exists, otherwise use the predefined item
      return user[i] !== undefined ? user[i] : predefined[i];
    }
  });
}

function mergeObjects(predefined, user) {
  const result = { ...predefined };

  for (const key in user) {
    if (Array.isArray(user[key]) && Array.isArray(predefined[key])) {
      result[key] = mergeArrays(predefined[key], user[key]);
    } else if (
      typeof user[key] === "object" &&
      user[key] !== null &&
      predefined[key]
    ) {
      // Merge nested objects
      result[key] = mergeObjects(predefined[key], user[key]);
    } else {
      result[key] = user[key];
    }
  }

  return result;
}

module.exports = mergeObjects;
