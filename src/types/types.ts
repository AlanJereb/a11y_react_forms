export type DraggableItem = {
  itemId: string;
  index: number;
};

export type DraggableState = "idle" | "preview" | "dragging";