import type { FormElements } from "../types/types";

const findElementIndexes = (
  id: string,
  formElements: FormElements[][],
): { row: number; col: number } => {
  for (let row = 0; row < formElements.length; row++) {
    for (let col = 0; col < formElements[row]!.length; col++) {
      if (formElements[row]![col]!.id === id) {
        return { row, col };
      }
    }
  }
  return { row: -1, col: -1 };
};

const areAllElementsEmpty = (formElements: FormElements[][]): boolean => {
  for (let row = 0; row < formElements.length; row++) {
    if (formElements[row]!.length > 0) {
      return false;
    }
  }
  return true;
};

export { findElementIndexes, areAllElementsEmpty };

