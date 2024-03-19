import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { backgroundOptions } from "../constants/backgroundOptions";
import { skillProficiencies } from "../constants/skillProficiencies";
import {
  artisanTools,
  musicalInstruments,
  gamingSets,
} from "../constants/toolProficiencies";
import { languages } from "../constants/languages";
import { initialCharacterState } from "../utils/initialCharacterState";
import { handleBackgroundChange } from "../utils/handleBackgroundChange";
import { handleMultipleBackgroundChanges } from "../utils/handleMultipleBackgroundChanges";
import { getCustomBackgroundToolOptions } from "../utils/getCustomBackgroundToolOptions";

function BackgroundSelect({
  backgroundOption,
  setBackgroundOption,
  setCharacter,
  character,
}) {
  const [isSpecialBackground, setIsSpecialBackground] = React.useState(false);
  // Backgrounds from the SRD that give their character extra languages
  const languageBackgrounds = [
    "Acolyte",
    "Guild Artisan",
    "Hermit",
    "Noble",
    "Outlander",
    "Sage",
  ];
  // Backgrounds from the SRD that lets users choose a tool proficiency
  const toolBackgrounds = [
    "Criminal",
    "Noble",
    "Outlander",
    "Entertainer",
    "Folk Hero",
    "Guild Artisan",
    "Soldier",
  ];
  const isExtraToolBackground = toolBackgrounds.includes(
    character.background.name
  );
  // handles how many languages the user can select based on their predefined background
  const maxLanguageOptions = ["Acolyte", "Sage"].includes(
    character.background.name
  )
    ? 2
    : 1;

  const renderSelectComponent = (
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

  const renderTextInputComponent = (
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

  return (
    <>
      <label>Background Type:</label>
      <select
        value={backgroundOption}
        onChange={(e) => {
          setBackgroundOption(e.target.value);
          // Reset the background fields to the initial state if the user decides to choose a custom background
          // This stops the user from having to manually clear the fields if they decide to switch from a predefined background to a custom one
          if (e.target.value === "Custom") {
            setCharacter((prevState) => ({
              ...prevState,
              background: initialCharacterState.background,
            }));
          }
        }}
      >
        <option value="SRD">SRD</option>
        <option value="Custom">Custom</option>
      </select>

      {/* Render this if the user decides to choose a predefined background */}

      {backgroundOption === "SRD" && (
        <select
          onChange={(e) => {
            const selectedBackground = e.target.value;
            setCharacter({
              ...character,
              background: {
                // initialCharacterState.background clears the background fields every time the user switches to a different predefined background
                ...initialCharacterState.background,
                name: e.target.value,
              },
            });
            const isSpecialBackground = [
              "Entertainer",
              "Folk Hero",
              "Guild Artisan",
              "Soldier",
            ].includes(selectedBackground);
            // Store the boolean value in the state so that it can be used later
            setIsSpecialBackground(isSpecialBackground);
          }}
        >
          <option value="">Select a background</option>
          {backgroundOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Render this if the user decides to choose a predefined background with extra languages */}
      {/* {languageBackgrounds.includes(character.background.name) && (
        <>
          <label>
            {" "}
            Languages: (Pick {isExtraLanguageBackground ? "2" : "1"})
          </label>
          <Select
            isMulti
            options={languages}
            onChange={handleSelectChange}
            value={character.background.languages.map((skill) => ({
              value: skill,
              label: skill,
            }))}
          />
        </>
      )} */}

      {/* Render this if the user decides to choose a predefined background with extra languages */}
      {languageBackgrounds.includes(character.background.name) && (
        <>
          {renderSelectComponent(
            "Languages",
            character.background.languages,
            languages,
            handleBackgroundChange,
            ["languages"],
            true,
            maxLanguageOptions
          )}
        </>
      )}
      {/* Render this if the user decides to choose a predefined background with extra tool proficiencies */}
      {isExtraToolBackground && (
        <>
          {renderSelectComponent(
            "Tool Proficiencies",
            character.background.toolProficiencies,
            getCustomBackgroundToolOptions(character.background.name),
            handleMultipleBackgroundChanges,
            isSpecialBackground
              ? ["toolProficiencies", "equipment"]
              : ["toolProficiencies"],
            false
          )}
        </>
      )}

      {/* Render this if the user decides to define a custom background */}

      {backgroundOption === "Custom" && (
        <>
          {renderTextInputComponent(
            "Custom Background Name",
            character.background.name,
            "name",
            setCharacter,
            character
          )}
          {renderTextInputComponent(
            "Background Description",
            character.background.description,
            "description",
            setCharacter,
            character
          )}

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
          <Select
            isMulti
            options={skillProficiencies}
            onChange={(selectedOptions) =>
              handleBackgroundChange(
                character,
                setCharacter,
                selectedOptions,
                "skillProficiencies"
              )
            }
            value={character.background.skillProficiencies.map((skill) => ({
              value: skill,
              label: skill,
            }))}
          />

          <label>Tool Proficiencies:</label>
          <CreatableSelect
            isMulti
            options={[...artisanTools, ...musicalInstruments, ...gamingSets]}
            onChange={(selectedOptions) =>
              handleBackgroundChange(
                character,
                setCharacter,
                selectedOptions,
                "toolProficiencies"
              )
            }
            value={character.background.toolProficiencies.map((tool) => ({
              value: tool,
              label: tool,
            }))}
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
