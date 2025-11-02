import type { FormElements } from "../types/types";
import Constants from "./constants";

const areAllElementsEmpty = (formElements: FormElements[][]): boolean => {
  for (let row = 0; row < formElements.length; row++) {
    if (formElements[row]!.length > 0) {
      return false;
    }
  }
  return true;
};

const insertElementAt = ({
  element,
  formElements,
  row,
  col,
  placeTo,
  destinationType,
}: {
  element: FormElements;
  formElements: FormElements[][];
  row: number;
  col: number;
  placeTo: "before" | "after";
  destinationType: "row" | "col";
}) => {
  const newFormElements = [...formElements];
  if (destinationType === "row") {
    const insertIndex = placeTo === "before" ? row : row + 1;
    newFormElements.splice(insertIndex, 0, [element]);
  } else {
    const insertIndex = placeTo === "before" ? col : col + 1;
    newFormElements[row]?.splice(insertIndex, 0, element);
  }
  return newFormElements;
};

const removePlaceholderFormElement = (formElements: FormElements[][]) => {
  return formElements.reduce<FormElements[][]>((acc, row) => {
    const filtered = row.filter(
      (e) => e.id !== Constants.fieldTypes.placeholder,
    );
    if (filtered.length > 0) {
      acc.push(filtered);
    }
    return acc;
  }, []);
};

export { areAllElementsEmpty, insertElementAt, removePlaceholderFormElement };
