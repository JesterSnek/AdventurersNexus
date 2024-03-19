function mergeObjects(predefined, user) {
  const result = { ...predefined };

  for (const key in user) {
    if (Array.isArray(user[key]) && Array.isArray(predefined[key])) {
      result[key] = [...new Set([...predefined[key], ...user[key]])];
    } else {
      result[key] = user[key];
    }
  }

  return result;
}

module.exports = mergeObjects;
