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
  dbFieldName,
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
          handleChange(
            character,
            setCharacter,
            selectedOptions,
            properties,
            dbFieldName
          );
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
  dbFieldName,
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
          handleChange(
            character,
            setCharacter,
            selectedOptions,
            properties,
            dbFieldName
          );
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
  dbFieldName,
  field,
  character,
  setCharacter
) => {
  return (
    <>
      <label>{label}:</label>
      <input
        type="text"
        onChange={(e) =>
          setCharacter({
            ...character,
            [dbFieldName]: {
              ...character[dbFieldName],
              [field]: e.target.value,
            },
          })
        }
        value={character[dbFieldName][field]}
      />
    </>
  );
};
