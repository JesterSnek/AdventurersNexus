import React from "react";
import { backgroundOptions } from "../constants/backgroundOptions";
import { initialCharacterState } from "../utils/initialCharacterState";

function BackgroundSelect({
  backgroundOption,
  setBackgroundOption,
  setCharacter,
  character,
}) {
  return (
    <>
      <label>Background Type:</label>
      <select
        value={backgroundOption}
        onChange={(e) => {
          setBackgroundOption(e.target.value);
          if (e.target.value === "Custom") {
            setCharacter(initialCharacterState);
          }
        }}
      >
        <option value="SRD">SRD</option>
        <option value="Custom">Custom</option>
      </select>

      {backgroundOption === "SRD" && (
        <select
          onChange={(e) =>
            setCharacter({
              ...character,
              background: {
                ...character.background,
                name: e.target.value,
              },
            })
          }
        >
          {backgroundOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {backgroundOption === "Custom" && (
        <>
          <label>Custom Background Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  name: e.target.value,
                },
              })
            }
            value={character.background.name}
          />

          <label>Background Description:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  description: e.target.value,
                },
              })
            }
            value={character.background.description}
          />

          <label>Equipment:</label>
          <textarea
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  equipment: e.target.value.split(","),
                },
              })
            }
            value={character.background.equipment.join(",")}
          />

          <label>Languages:</label>
          <textarea
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  languages: e.target.value.split(","),
                },
              })
            }
            value={character.background.languages.join(",")}
          />

          <label>Skill Proficiencies:</label>
          <textarea
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  skillProficiencies: e.target.value.split(","),
                },
              })
            }
            value={character.background.skillProficiencies.join(",")}
          />

          <label>Tool Proficiencies:</label>
          <textarea
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  toolProficiencies: e.target.value.split(","),
                },
              })
            }
            value={character.background.toolProficiencies.join(",")}
          />

          <label>Feature Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  feature: {
                    ...character.background.feature,
                    name: e.target.value,
                  },
                },
              })
            }
            value={character.background.feature.name}
          />

          <label>Feature Description:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  feature: {
                    ...character.background.feature,
                    description: e.target.value,
                  },
                },
              })
            }
            value={character.background.feature.description}
          />

          <label>Personality Traits:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  personalityTraits: e.target.value,
                },
              })
            }
            value={character.background.personalityTraits}
          />

          <label>Ideals:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  ideals: e.target.value,
                },
              })
            }
            value={character.background.ideals}
          />

          <label>Bonds:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  bonds: e.target.value,
                },
              })
            }
            value={character.background.bonds}
          />

          <label>Flaws:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: {
                  ...character.background,
                  flaws: e.target.value,
                },
              })
            }
            value={character.background.flaws}
          />
        </>
      )}
    </>
  );
}

export default BackgroundSelect;
