import React, { useEffect, useRef, useState } from "react";
import {
  draggable
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";

interface FieldBaseProps extends DraggableItem {
  children?: React.ReactNode;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  id,
  fieldType,
  label,
  children,
  index,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        onDragStart: () => {
          // TODO: modify add drop targets between editor elements, between all elements,
          // but the element on current index and one behind and one in front of it
          // TODO: move editor state to the app context, so that you can access from both sidebar and editor
          setIsDragging(true)
        },
        onDrop: () => setIsDragging(false),
        getInitialData: () => ({
          type: Constants.fieldTypeCard,
          id: id,
          fieldType: fieldType,
        }),
      }),
    );
    return cleanup;
  }, [id]);

  return (
    <div ref={ref} className={`p-[1.5rem] hover:cursor-grab ${isDragging ? "opacity-40" : ""}`}>
      {label && <p className="text-start text-[1rem] font-medium">{label}</p>}
      {children}
    </div>
  );
};

export default FieldBase;
