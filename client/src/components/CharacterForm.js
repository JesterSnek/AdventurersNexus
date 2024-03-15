import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCharacterContext } from "../hooks/useCharacterContext";

const CharacterForm = () => {
  const { dispatch } = useCharacterContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const [character, setCharacter] = useState({
    name: "",
    characterClass: { name: "" },
    race: { name: "" },
    background: {
      name: "",
      description: "",
      language: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in for this action.");
      return;
    }

    const responseB = await fetch(
      `/api/backgrounds/${character.background.name}`
    );
    const background = await responseB.json();

    if (background) {
      // If the background exists, set the background field to its ObjectId
      character.background = background._id;
      character.customBackground = null;
    } else {
      // If the background doesn't exist, set customBackground to the entered details
      character.customBackground = {
        name: character.background.name /* other fields */,
      };
      character.background = null;
    }

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
    setCharacter({
      ...character,
      name: "",
      characterClass: { name: "" },
      race: { name: "" },
      background: {
        ...character.background,
        name: "",
        description: "",
        language: "",
      },
    });

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

          <label>Character Class:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                characterClass: { name: e.target.value },
              })
            }
            value={character.characterClass.name}
          />

          <label>Character Race:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                race: { name: e.target.value },
              })
            }
            value={character.race.name}
          />

          <label>Background:</label>
          <input
            type="text"
            onChange={(e) =>
              setCharacter({
                ...character,
                background: { name: e.target.value },
              })
            }
            value={character.background.name}
          />

          <button>Create Character</button>
        </form>
      )}
    </div>
  );
};

export default CharacterForm;
