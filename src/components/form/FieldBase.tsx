import React, { useEffect, useRef, useState } from "react";
import {
  draggable
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";
import { AppContext } from "../../App";

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
  const appContext = React.useContext(AppContext);
  const [isDragging, setIsDragging] = useState(false);

  if (!appContext) return null;

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        onDragStart: (args) => {
          // ----------------------------------------------------------------------
          // Add drop targets between editor elements, between all elements,
          // but the element on current index and one behind and one in front of it
          // ----------------------------------------------------------------------
          appContext.setFormElements((prev) => {
            const id = args.source.data.id as string;
            // If the element we are dragging is from the sidebar
            // we don't modify the current form elements
            if (!prev[id]) return prev;

            // Draw placeholders between elements
            const newFormElements = { ...prev };
            let i = 0;
            Object.keys(prev).forEach((key) => {
              // Add placeholder before the current index
              if (i === index && i !== 0) {
                newFormElements[`placeholder-${id}-${i - 1}`] = Constants.fieldTypes.placeholder;
              }
              newFormElements[key] = prev[key]!;
              i++;
            });
            return newFormElements;
          });
          // ----------------------------------------------------------------------
          setIsDragging(true)
        },
        onDrop: () => {
          // remove all placeholders after drop
          appContext.setFormElements((prev) => {
            const newFormElements = { ...prev };
            Object.keys(prev).forEach((key) => {
              if (!key.startsWith("placeholder-")) {
                newFormElements[key] = prev[key]!;
              }
            });
            return newFormElements;
          });
          setIsDragging(false);
        },
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
