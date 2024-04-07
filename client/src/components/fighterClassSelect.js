// FighterClassSelect.js
import React from "react";
import { useState } from "react";

import { renderSelectComponent } from "./formComponents";
import { handleFieldChange } from "../utils/handleFieldChange";
import { fighterSkillOptions } from "../constants/skillProficiencies";
import { EquipmentRadio } from "./EquipmentRadio";
import { martialWeaponOptions } from "../constants/martialWeaponOptions";
import { fighterStyleOptions } from "../constants/FighterStyleOptions";

const FighterClassSelect = ({ character, setCharacter }) => {
  const fighterAbilityOptions = [
    { value: "Strength", label: "Strength" },
    { value: "Dexterity", label: "Dexterity" },
  ];
  const [weaponChoice, setWeaponChoice] = useState(null);

  return (
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
          equipmentIndex={0}
        />
        <EquipmentRadio
          equipment={["Leather Armor", "Longbow", "20 Arrows"]}
          character={character}
          setCharacter={setCharacter}
          equipmentIndex={0}
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
      <div className="equipment-radio-group">
        <EquipmentRadio
          equipment={["Light Crossbow", "20 Bolts"]}
          character={character}
          setCharacter={setCharacter}
          equipmentIndex={2}
        />
        <EquipmentRadio
          equipment={["Handaxe", "Handaxe"]}
          character={character}
          setCharacter={setCharacter}
          equipmentIndex={2}
        />
        <EquipmentRadio
          equipment="Dungeoneer's Pack"
          character={character}
          setCharacter={setCharacter}
          equipmentIndex={3}
        />
        <EquipmentRadio
          equipment="Explorer's Pack"
          character={character}
          setCharacter={setCharacter}
          equipmentIndex={3}
        />
      </div>
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
  );
};

export default FighterClassSelect;
