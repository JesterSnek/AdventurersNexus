import React from "react";
import { useState } from "react";

import { initialCharacterState } from "../utils/initialCharacterState";
import { characterClassOptions } from "../constants/characterClassOptions";
import { renderTextInputComponent } from "./formComponents";
import FighterClassSelect from "./fighterClassSelect";

const CharacterClassSelect = ({ character, setCharacter }) => {
  const [characterClassOption, setCharacterClassOption] = useState("SRD"); // SRD or Custom

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
              // character.characterClass.classFeatures[0].features[0].name
              characterClass: {
                ...character.characterClass,
                name: e.target.value,
                primaryAbility: [],
                skillProficiencies: [],
                startingEquipment: [
                  { equipment: [] },
                  { equipment: [] },
                  { equipment: [] },
                  { equipment: [] },
                ],
                classFeatures: [
                  {
                    features: [
                      {
                        name: "",
                      },
                    ],
                  },
                ],
              },
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
          {character.characterClass.name === "Fighter" && (
            <FighterClassSelect
              character={character}
              setCharacter={setCharacter}
            />
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
