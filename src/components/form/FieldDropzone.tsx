import React, { useContext, useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants, { placeholderFormElement } from "../../helpers/constants";
import {
  insertElementAt,
  removePlaceholderFormElement,
} from "../../helpers/formHelpers";
import { AppContext } from "../../contexts/AppContextProvider";

interface FieldDropzoneProps {
  position: "top" | "right" | "bottom" | "left";
  fieldWidth?: number;
  row: number;
  col: number;
}


const FieldDropzone = ({
  position,
  fieldWidth,
  row,
  col,
}: FieldDropzoneProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const appContext = useContext(AppContext);
  const ref = useRef<HTMLDivElement>(null);
  const expandedHeight = "calc(50px + 3rem)";
  const expandedWidth = `calc(${fieldWidth}px - 1.5rem)`; // -1.5rem deletes one padding ...max 2 columns per form
  const placeholderAddedRef = useRef(false);

  if (!appContext) return null;

  const cleanup = () => {
    setIsHovering(false);
    placeholderAddedRef.current = false;
    console.log("dragLeave");
    appContext.setFormElements((prev) => removePlaceholderFormElement(prev));
  };

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        setIsHovering(true);
        if (!placeholderAddedRef.current) {
          appContext.setFormElements((prev) => {
            const hasPlaceholder = prev.some((r) =>
              r.some((e) => e.id === Constants.fieldTypes.placeholder),
            );
            console.log(`dragEnter ${placeholderAddedRef.current}`);
            console.log(`hasPlaceholder ${hasPlaceholder}`);
            if (hasPlaceholder) {
              return prev; // do nothing if one already exists
            }
            placeholderAddedRef.current = true;
            return insertElementAt({
              element: placeholderFormElement,
              formElements: prev,
              row,
              col,
              placeTo:
                position === "top" || position === "left" ? "before" : "after",
              destinationType:
                position === "left" || position === "right" ? "col" : "row",
            });
          });
        }
      },
      onDragLeave: (_) => cleanup(),
      onDrop: (_) => cleanup(),
    });
  }, []);

  return (
    <div
      ref={ref}
      className={["field-dropzone", position].join(" ")}
      style={{
        height:
          (position === "top" || position === "bottom") && isHovering
            ? expandedHeight
            : undefined,
        width:
          (position === "left" || position === "right") && isHovering
            ? expandedWidth
            : undefined,
        left:
          position === "right" ? `calc(${fieldWidth}px - 1.5rem)` : undefined,
        right:
          position === "left" ? `calc(${fieldWidth}px - 1.5rem)` : undefined,
      }}
    />
  );
};

export default FieldDropzone;
