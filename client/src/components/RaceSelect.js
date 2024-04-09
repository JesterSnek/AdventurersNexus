import React from "react";
import { useState } from "react";

import { initialCharacterState } from "../utils/initialCharacterState";
import { raceOptions } from "../constants/raceOptions";

const RaceSelect = ({ character, setCharacter }) => {
  const [raceOption, setRaceOption] = useState("SRD"); // SRD or Custom

  return (
    <>
      <label>Race Type:</label>
      <select
        value={raceOption}
        onChange={(e) => {
          setRaceOption(e.target.value);
          //Reset the race fields to the initial state if the user decides to choose a custom race
          if (e.target.value === "Custom") {
            setCharacter((prevState) => ({
              ...prevState,
              race: initialCharacterState.race,
            }));
          }
        }}
      >
        <option value="SRD">SRD</option>
        <option value="Custom">Custom</option>
      </select>

      {/* Render this if the user decides to choose a predefined SRD character race */}

      {raceOption === "SRD" && (
        <select
          onChange={(e) => {
            setCharacter({
              ...character,
              // **** The RACE object is being updated here ****
              race: {
                ...character.race,
                name: e.target.value,
              },
            });
          }}
        >
          <option value="">Select a Character Race</option>
          {raceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Render this if the user decides to choose a custom character race */}
      {raceOption === "Custom" && <></>}
    </>
  );
};

export default RaceSelect;
