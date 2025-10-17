import Constants from "../helpers/constants";

export type DraggableItem = {
  id: string;
  fieldType: FieldType;
  index: number;
  label?: string;
  disabled?: boolean;
};

export type DraggableState = "idle" | "preview" | "dragging";

type FieldType = typeof Constants.fieldTypes[keyof typeof Constants.fieldTypes];