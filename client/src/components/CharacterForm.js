import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCharacterContext } from "../hooks/useCharacterContext";

const CharacterForm = () => {
  const { dispatch } = useCharacterContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in for this action.");
      return;
    }

    const newCharacter = { name, characterClass, race };

    const response = await fetch("/api/character/createCharacter", {
      method: "POST",
      body: JSON.stringify(newCharacter),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    console.log("New Character created.", json);
    setName("");
    setCharacterClass("");
    setRace("");

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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Character Class:</label>
          <input
            type="text"
            onChange={(e) => setCharacterClass(e.target.value)}
            value={characterClass}
          />
          <label>Character Race:</label>
          <input
            type="text"
            onChange={(e) => setRace(e.target.value)}
            value={race}
          />

          <button>Create Character</button>
        </form>
      )}
    </div>
  );
};

export default CharacterForm;
