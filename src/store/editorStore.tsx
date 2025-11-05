import { devtools, persist } from "zustand/middleware";
import Constants from "../helpers/constants";
import type { FormElements } from "../types/types";
import { create } from "zustand";

export interface EditorStoreInterface {
  formElements: FormElements[][];
  setFormElements: (formElements: FormElements[][]) => void;
  draggingElementId?: string;
  setDraggingElementId?: (draggingElementId: string | undefined) => void;
  removePlaceholderFormElement: () => void;
  insertElementAt: ({
    element,
    row,
    col,
    placeTo,
    destinationType,
  }: Omit<TypeInsertElementAt, "formElements">) => void;
}

const editorStore = create<EditorStoreInterface>()(
  devtools(
    persist(
      (set) => ({
        formElements: [],
        setFormElements: (formElements: FormElements[][]) =>
          set({ formElements }),
        draggingElementId: undefined,
        setDraggingElementId: (draggingElementId: string | undefined) =>
          set({ draggingElementId }),
        removePlaceholderFormElement: () =>
          set((state) => ({
            formElements: removePlaceholderFormElementAction(
              state.formElements,
            ),
          })),
        insertElementAt: ({
          element,
          row,
          col,
          placeTo,
          destinationType,
        }: Omit<TypeInsertElementAt, "formElements">) =>
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
      }),
      {
        name: "editor-storage",
      },
    ),
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
