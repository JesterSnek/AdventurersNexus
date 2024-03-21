export function handleFieldChange(
  character,
  setCharacter,
  selectedOptions,
  fieldName,
  dbFieldName
) {
  // Ensure selectedOptions is always an array
  // Otherwise react-select will cause an error if "isMulti" is false
  const options = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];

  setCharacter({
    ...character,
    [dbFieldName]: {
      ...character[dbFieldName],
      [fieldName]: options.map((option) => option.value),
    },
  });
}
