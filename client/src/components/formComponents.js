import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

export const renderSelectComponent = (
  character,
  setCharacter,
  label,
  value,
  options,
  handleChange,
  properties,
  isMulti = true,
  maxOptions = Infinity
) => {
  return (
    <>
      <label>{label}:</label>
      <Select
        isMulti={isMulti}
        options={options}
        onChange={(selectedOptions) => {
          if (isMulti && selectedOptions.length > maxOptions) {
            return;
          }
          handleChange(character, setCharacter, selectedOptions, properties);
        }}
        value={value.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    </>
  );
};
export const renderCreatableComponent = (
  character,
  setCharacter,
  label,
  value,
  handleChange,
  properties,
  isMulti = true,
  maxOptions = Infinity,
  options = []
) => {
  return (
    <>
      <label>{label}:</label>
      <Creatable
        isMulti={isMulti}
        options={options}
        onChange={(selectedOptions) => {
          if (isMulti && selectedOptions.length > maxOptions) {
            return;
          }
          handleChange(character, setCharacter, selectedOptions, properties);
        }}
        value={value.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    </>
  );
};

export const renderTextInputComponent = (
  label,
  value,
  field,
  setCharacter,
  character
) => {
  return (
    <>
      <label>{label}:</label>
      <input
        type="text"
        onChange={(e) =>
          setCharacter({
            ...character,
            background: {
              ...character.background,
              [field]: e.target.value,
            },
          })
        }
        value={value}
      />
    </>
  );
};
