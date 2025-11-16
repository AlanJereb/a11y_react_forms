import type { FormElements } from "../types/types";

const areAllElementsEmpty = (formElements: FormElements[][]): boolean => {
  for (let row = 0; row < formElements.length; row++) {
    if (formElements[row]!.length > 0) {
      return false;
    }
  }
  return true;
};



export { areAllElementsEmpty };
