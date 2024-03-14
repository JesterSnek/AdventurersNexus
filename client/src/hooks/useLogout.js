import { useAuthContext } from "./useAuthContext";
import { useCharacterContext } from "./useCharacterContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: characterDispatch } = useCharacterContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    characterDispatch({ type: "SET_CHARACTER", payload: null });
  };

  return { logout };
};
