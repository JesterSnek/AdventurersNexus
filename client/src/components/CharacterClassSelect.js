import React from "react";
import { useState } from "react";

import { initialCharacterState } from "../utils/initialCharacterState";
import { characterClassOptions } from "../constants/characterClassOptions";
import {
  renderTextInputComponent,
  renderSelectComponent,
} from "./formComponents";
import { handleFieldChange } from "../utils/handleFieldChange";
import { fighterSkillOptions } from "../constants/skillProficiencies";
import { EquipmentRadio } from "./EquipmentRadio";
import { martialWeaponOptions } from "../constants/martialWeaponOptions";
import { fighterStyleOptions } from "../constants/FighterStyleOptions";

const CharacterClassSelect = ({ character, setCharacter }) => {
  const [characterClassOption, setCharacterClassOption] = useState("SRD"); // SRD or Custom
  const [weaponChoice, setWeaponChoice] = useState(null);
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
              // character.characterClass.classFeatures[0].features[0].name
              characterClass: {
                ...character.characterClass,
                name: e.target.value,
                primaryAbility: [],
                skillProficiencies: [],
                startingEquipment: [{ equipment: [] }, { equipment: [] }],
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
          {renderSelectComponent(
            character,
            setCharacter,
            "Choose 2 skill proficiencies for your Fighter: ",
            character.characterClass.skillProficiencies,
            fighterSkillOptions,
            handleFieldChange,
            "skillProficiencies",
            "characterClass",
            true,
            2
          )}
          <h3>Choose your equipment:</h3>
          <h4>Armor:</h4>
          <div className="equipment-radio-group">
            <EquipmentRadio
              equipment="Chain Mail"
              character={character}
              setCharacter={setCharacter}
            />
            <EquipmentRadio
              equipment={["Leather Armor", "Longbow", "20 Arrows"]}
              character={character}
              setCharacter={setCharacter}
            />
          </div>
          <h4>Weapon:</h4>
          <div className="equipment-radio-group">
            <label>
              <input
                type="radio"
                value="a"
                checked={weaponChoice === "a"}
                onChange={() => setWeaponChoice("a")}
              />
              <span className="radio-label">A Martial Weapon and a Shield</span>
            </label>
            <label>
              <input
                type="radio"
                value="b"
                checked={weaponChoice === "b"}
                onChange={() => setWeaponChoice("b")}
              />
              <span className="radio-label">Two Martial Weapons</span>
            </label>
          </div>

          {/* Conditionally render the renderSelectComponent based on the weapon choice */}
          {weaponChoice === "a" &&
            renderSelectComponent(
              character,
              setCharacter,
              "Choose A Martial Weapon: ",
              character.characterClass.startingEquipment[1].equipment,
              martialWeaponOptions,
              handleFieldChange,
              "equipment",
              "characterClass",
              false,
              1,
              ["startingEquipment", "1"]
            )}
          {weaponChoice === "b" &&
            renderSelectComponent(
              character,
              setCharacter,
              "Choose Two Martial Weapons: ",
              character.characterClass.startingEquipment[1].equipment,
              martialWeaponOptions,
              handleFieldChange,
              "equipment",
              "characterClass",
              true,
              2,
              ["startingEquipment", "1"]
            )}
          {renderSelectComponent(
            character,
            setCharacter,
            "Choose a style of fighting as your specialty: ",
            character.characterClass.classFeatures[0].features[0].name,
            fighterStyleOptions,
            handleFieldChange,
            "name",
            "characterClass",
            false,
            1,
            ["classFeatures", "0", "features", "0"]
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
