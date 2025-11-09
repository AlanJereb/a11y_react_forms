import { combine, devtools } from "zustand/middleware";
import Constants from "../helpers/constants";
import type { FormElements } from "../types/types";
import { create } from "zustand";

export interface EditorStoreInterface {
  formElements: FormElements[][];
  setFormElements: (formElements: FormElements[][]) => void;
  draggingElementId?: string;
  setDraggingElementId?: (draggingElementId: string | undefined) => void;
  fieldWidth: { [key: string]: number };
  setFieldWidth: (id: string, width: number) => void;
  fieldIsDragging: { [key: string]: boolean };
  setFieldIsDragging: (id: string, isDragging: boolean) => void;
  removePlaceholderFormElement: () => void;
  insertElementAt: ({
    element,
    row,
    col,
    placeTo,
    destinationType,
  }: Omit<TypeInsertElementAt, "formElements">) => void;
}

const editorStore = create(
  devtools(
    combine<
      Pick<EditorStoreInterface, "formElements" | "draggingElementId" | "fieldWidth" | "fieldIsDragging">,
      Omit<EditorStoreInterface, "formElements" | "draggingElementId" | "fieldWidth" | "fieldIsDragging">
    >({ formElements: [], draggingElementId: undefined, fieldWidth: {}, fieldIsDragging: {} }, (set) => ({
      setFormElements: (formElements) => set({ formElements }),
      setDraggingElementId: (draggingElementId) => set({ draggingElementId }),
      setFieldWidth: (id, width) => set((state) => ({
        fieldWidth: { ...state.fieldWidth, [id]: width },
      })),
      setFieldIsDragging: (id, isDragging) => set((state) => ({
        fieldIsDragging: { ...state.fieldIsDragging, [id]: isDragging },
      })),
      removePlaceholderFormElement: () =>
        set((state) => ({
          formElements: removePlaceholderFormElementAction(state.formElements),
        })),
      insertElementAt: ({ element, row, col, placeTo, destinationType }) =>
        set((state) => ({
          formElements: insertElementAtAction({
            element,
            formElements: state.formElements,
            row,
            col,
            placeTo,
            destinationType,
          }),
        })),
    })),
  ),
);

const removePlaceholderFormElementAction = (formElements: FormElements[][]) => {
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

interface TypeInsertElementAt {
  element: FormElements;
  formElements: FormElements[][];
  row: number;
  col: number;
  placeTo: "before" | "after";
  destinationType: "row" | "col";
}

const insertElementAtAction = ({
  element,
  formElements,
  row,
  col,
  placeTo,
  destinationType,
}: TypeInsertElementAt) => {
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

export default editorStore;
