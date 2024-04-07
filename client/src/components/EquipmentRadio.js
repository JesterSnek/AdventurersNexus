import React from "react";

export function EquipmentRadio({
  equipment,
  character,
  setCharacter,
  equipmentIndex,
}) {
  // Ensure equipment is an array
  const equipmentArray = Array.isArray(equipment) ? equipment : [equipment];

  return (
    <label>
      <input
        type="radio"
        value={equipmentArray[0]}
        checked={equipmentArray.every((item) =>
          character.characterClass.startingEquipment[
            equipmentIndex
          ]?.equipment?.includes(item)
        )}
        onChange={() => {
          const newCharacter = { ...character };
          newCharacter.characterClass.startingEquipment[
            equipmentIndex
          ].equipment = equipmentArray;
          setCharacter(newCharacter);
        }}
      />
      {equipmentArray.join(", ")}
    </label>
  );
}
