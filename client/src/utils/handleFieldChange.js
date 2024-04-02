export function handleFieldChange(
  character,
  setCharacter,
  selectedOptions,
  fieldName,
  dbFieldName,
  path = []
) {
  // Ensure selectedOptions is always an array
  // Otherwise react-select will cause an error if "isMulti" is false
  const options = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];

  const newCharacter = { ...character };
  let current = newCharacter[dbFieldName];
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }

  // If the field is not nested, update the object directly
  if (path.length === 0) {
    current[fieldName] = options.map((option) => option.value);
  } else {
    // If the field is nested, update the nested object
    current[path[path.length - 1]][fieldName] = options.map(
      (option) => option.value
    );
  }

  setCharacter(newCharacter);
}
