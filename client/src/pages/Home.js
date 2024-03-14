import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCharacterContext } from "../hooks/useCharacterContext";

// components
import CharacterDetails from "../components/CharacterDetails";

const Home = () => {
  const { user } = useAuthContext();
  const { characters, dispatch } = useCharacterContext();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("/api/character", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CHARACTER", payload: json.docs });
        //console.log(json);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {user && (
        <div className="characters">
          {characters &&
            characters.map((character) => (
              <CharacterDetails character={character} key={character._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
