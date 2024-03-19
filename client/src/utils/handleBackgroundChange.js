export function handleBackgroundChange(
  character,
  setCharacter,
  selectedOptions,
  fieldName
) {
  // Ensure selectedOptions is always an array
  // Otherwise react-select will cause an error if "isMulti" is false
  const options = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];

  setCharacter({
    ...character,
    background: {
      ...character.background,
      [fieldName]: options.map((option) => option.value),
    },
  });
}
