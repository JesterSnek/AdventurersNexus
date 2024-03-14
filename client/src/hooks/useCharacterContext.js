import { CharacterContext } from "../context/characterContext";
import { useContext } from "react";

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);

  if (!context) {
    throw Error(
      "useCharacterContext must be used inside an CharacterContextProvider"
    );
  }

  return context; //z
};
