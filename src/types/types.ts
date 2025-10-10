export type DraggableItem = {
  itemId: string;
  index: number;
  label?: string;
  disabled?: boolean;
};

export type DraggableState = "idle" | "preview" | "dragging";