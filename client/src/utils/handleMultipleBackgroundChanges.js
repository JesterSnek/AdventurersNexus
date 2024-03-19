export function handleMultipleBackgroundChanges(
  character,
  setCharacter,
  selectedOptions,
  fieldNames
) {
  // Ensure selectedOptions is always an array
  // Otherwise react-select will cause an error if "isMulti" is false
  const options = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];

  const newBackground = { ...character.background };

  fieldNames.forEach((fieldName) => {
    newBackground[fieldName] = options.map((option) => option.value);
  });

  setCharacter({
    ...character,
    background: newBackground,
  });
}
