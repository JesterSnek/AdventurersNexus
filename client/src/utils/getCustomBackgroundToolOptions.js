import {
  artisanTools,
  musicalInstruments,
  gamingSets,
} from "../constants/toolProficiencies";

export const getCustomBackgroundToolOptions = (backgroundName) => {
  let selectOptions = [];
  switch (backgroundName) {
    case "Criminal":
    case "Noble":
    case "Soldier":
      selectOptions = gamingSets;
      break;
    case "Entertainer":
    case "Outlander":
      selectOptions = musicalInstruments;
      break;
    default:
      selectOptions = artisanTools;
      break;
  }
  return selectOptions;
};
