import React from "react";
import { backgroundOptions } from "../constants/backgroundOptions";
import { skillProficiencies } from "../constants/skillProficiencies";
import {
  artisanTools,
  musicalInstruments,
  gamingSets,
} from "../constants/toolProficiencies";
import { languages } from "../constants/languages";
import { initialCharacterState } from "../utils/initialCharacterState";
import { handleFieldChange } from "../utils/handleFieldChange";
import { handleMultipleBackgroundChanges } from "../utils/handleMultipleBackgroundChanges";
import { getCustomBackgroundToolOptions } from "../utils/getCustomBackgroundToolOptions";
import {
  renderSelectComponent,
  renderCreatableComponent,
  renderTextInputComponent,
} from "./formComponents";
import { languageBackgrounds } from "../constants/languageBackgrounds";
import { toolBackgrounds } from "../constants/toolBackgrounds";

function BackgroundSelect({
  backgroundOption,
  setBackgroundOption,
  setCharacter,
  character,
}) {
  const [isEquipmentBackground, setisEquipmentBackground] =
    React.useState(false);

  const isExtraToolBackground = toolBackgrounds.includes(
    character.background.name
  );
  // handles how many languages the user can select based on their predefined background
  const maxLanguageOptions = ["Acolyte", "Sage"].includes(
    character.background.name
  )
    ? 2
    : 1;

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
                // clear the needed background fields every time the user switches to a different predefined background
                name: e.target.value,
                equipment: [],
                languages: [],
                toolProficiencies: [],
              },
            });
            const isEquipmentBackground = [
              "Entertainer",
              "Folk Hero",
              "Guild Artisan",
              "Soldier",
            ].includes(selectedBackground);
            // Store the boolean value in the state so that it can be used later
            setisEquipmentBackground(isEquipmentBackground);
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
      {languageBackgrounds.includes(character.background.name) && (
        <>
          {renderSelectComponent(
            character,
            setCharacter,
            "Languages",
            character.background.languages,
            languages,
            handleFieldChange,
            ["languages"],
            "background",
            true,
            maxLanguageOptions
          )}
        </>
      )}
      {/* Render this if the user decides to choose a predefined background with extra tool proficiencies */}
      {isExtraToolBackground && (
        <>
          {renderSelectComponent(
            character,
            setCharacter,
            "Tool Proficiencies",
            character.background.toolProficiencies,
            getCustomBackgroundToolOptions(character.background.name),
            handleMultipleBackgroundChanges,
            isEquipmentBackground
              ? ["toolProficiencies", "equipment"]
              : ["toolProficiencies"],
            "background",
            false
          )}
        </>
      )}

      {/* Render this if the user decides to define a custom background */}

      {backgroundOption === "Custom" && (
        <>
          {renderTextInputComponent(
            "Custom Background Name",
            "background",
            "name",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Background Description",
            "background",
            "description",
            character,
            setCharacter
          )}
          {renderCreatableComponent(
            character,
            setCharacter,
            "Equipment: ",
            character.background.equipment,
            handleFieldChange,
            ["equipment"],
            "background",
            true
          )}
          {renderCreatableComponent(
            character,
            setCharacter,
            "Languages: ",
            character.background.languages,
            handleFieldChange,
            ["languages"],
            "background",
            true
          )}
          {renderSelectComponent(
            character,
            setCharacter,
            "Skill Proficiencies: ",
            character.background.skillProficiencies,
            skillProficiencies,
            handleFieldChange,
            "skillProficiencies",
            "background",
            true
          )}
          {renderCreatableComponent(
            character,
            setCharacter,
            "Tool Proficiencies: ",
            character.background.toolProficiencies,
            handleFieldChange,
            ["toolProficiencies"],
            "background",
            true,
            Infinity,
            [...artisanTools, ...musicalInstruments, ...gamingSets]
          )}
          {renderTextInputComponent(
            "Feature Name: ",
            "background",
            "featureName",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Feature Description: ",
            "background",
            "featureDescription",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Personality Traits: ",
            "background",
            "personalityTraits",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Ideals: ",
            "background",
            "ideals",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Bonds: ",
            "background",
            "bonds",
            character,
            setCharacter
          )}
          {renderTextInputComponent(
            "Flaws: ",
            "background",
            "flaws",
            character,
            setCharacter
          )}
        </>
      )}
    </>
  );
}

export default BackgroundSelect;
