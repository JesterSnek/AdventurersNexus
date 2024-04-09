import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCharacterContext } from "../hooks/useCharacterContext";
import BackgroundSelect from "./BackgroundSelect";
import { initialCharacterState } from "../utils/initialCharacterState";
import CharacterClassInput from "./CharacterClassSelect";
import RaceSelect from "./RaceSelect";

const CharacterForm = () => {
  const { dispatch } = useCharacterContext();
  const { user } = useAuthContext();
  // const [error, setError] = useState(null);

  const [backgroundOption, setBackgroundOption] = useState("SRD"); // SRD or Custom
  const [character, setCharacter] = useState(initialCharacterState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!user) {
    //   setError("You must be logged in for this action.");
    //   return;
    // }

    const response = await fetch("/api/character/createCharacter", {
      method: "POST",
      body: JSON.stringify(character),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    console.log("New Character created.", json);
    setCharacter(initialCharacterState);

    dispatch({ type: "CREATE_CHARACTER", payload: json.doc });
  };

  return (
    <div className="characterForm">
      {user && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Create a New Character</h3>

          <label>Character Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({ ...character, name: e.target.value })
            }
            value={character.name}
          />

          <RaceSelect character={character} setCharacter={setCharacter} />

          <BackgroundSelect
            backgroundOption={backgroundOption}
            setBackgroundOption={setBackgroundOption}
            setCharacter={setCharacter}
            character={character}
          />

          <CharacterClassInput
            character={character}
            setCharacter={setCharacter}
          />

          <button>Create Character</button>
        </form>
      )}
    </div>
  );
};

export default CharacterForm;
