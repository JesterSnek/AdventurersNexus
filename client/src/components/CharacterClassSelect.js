import React from "react";
import { useState } from "react";

import { initialCharacterState } from "../utils/initialCharacterState";
import { characterClassOptions } from "../constants/characterClassOptions";
import {
  renderTextInputComponent,
  renderSelectComponent,
} from "./formComponents";
import { handleFieldChange } from "../utils/handleFieldChange";

const CharacterClassSelect = ({ character, setCharacter }) => {
  const [characterClassOption, setCharacterClassOption] = useState("SRD"); // SRD or Custom
  const fighterAbilityOptions = [
    { value: "Strength", label: "Strength" },
    { value: "Dexterity", label: "Dexterity" },
  ];

  return (
    <>
      <label>Class Type:</label>
      <select
        value={characterClassOption}
        onChange={(e) => {
          setCharacterClassOption(e.target.value);
          //Reset the characterClass fields to the initial state if the user decides to choose a custom characterClass
          if (e.target.value === "Custom") {
            setCharacter((prevState) => ({
              ...prevState,
              characterClass: initialCharacterState.characterClass,
            }));
          }
        }}
      >
        <option value="SRD">SRD</option>
        <option value="Custom">Custom</option>
      </select>

      {/* Render this if the user decides to choose a predefined SRD character class */}

      {characterClassOption === "SRD" && (
        <select
          onChange={(e) => {
            setCharacter({
              ...character,
              // **** The characterClass object is being updated here ****
              characterClass: { name: e.target.value, primaryAbility: [] },
            });
          }}
        >
          <option value="">Select a Character Class</option>
          {characterClassOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Render this if the user decides to choose the SRD Fighter class */}
      {character.characterClass.name === "Fighter" && (
        <>
          {renderSelectComponent(
            character,
            setCharacter,
            "Choose between Strength or Dexterity for your Fighter's primary ability score: ",
            character.characterClass.primaryAbility,
            fighterAbilityOptions,
            handleFieldChange,
            "primaryAbility",
            "characterClass",
            false
          )}
        </>
      )}

      {/* Render this if the user decides to choose a custom character class */}
      {characterClassOption === "Custom" && (
        <>
          {renderTextInputComponent(
            "Custom Class Name: ",
            "characterClass",
            "name",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Hit Dice: ",
            "characterClass",
            "hitDice",
            character,
            setCharacter
          )}
        </>
      )}
    </>
  );
};

export default CharacterClassSelect;
