import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants, { placeholderFormElement } from "../../helpers/constants";
import editorStore from "../../store/editorStore";

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
  const removePlaceholderFormElement = editorStore.getState().removePlaceholderFormElement;
  const insertElementAt = editorStore.getState().insertElementAt;
  const ref = useRef<HTMLDivElement>(null);
  const placeholderAddedRef = useRef<String>(null);
  const expandedHeight = "calc(50px + 3rem)";
  const expandedWidth = `calc(${fieldWidth}px - 1.5rem)`; // -1.5rem deletes one padding ...max 2 columns per form

  const cleanup = () => {
    placeholderAddedRef.current = null;
    setIsHovering(false);
    console.log("dragLeave");
    removePlaceholderFormElement();
  };

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        setIsHovering(true);
        if (!placeholderAddedRef.current) {
          placeholderAddedRef.current = position;
          const {formElements: fe} = editorStore.getState();
          const formElementsContainPlaceholder = fe.some((row) =>
            row.some((el) => el.id === Constants.fieldTypes.placeholder)
          );
          console.log(`dragEnter position ${placeholderAddedRef.current}`);
          console.log(`hasPlaceholder ${formElementsContainPlaceholder}`);
          if (formElementsContainPlaceholder) {
            return; // do nothing if one already exists
          }
          insertElementAt({
            element: placeholderFormElement,
            row,
            col,
            placeTo:
              position === "top" || position === "left" ? "before" : "after",
            destinationType:
              position === "left" || position === "right" ? "col" : "row",
          });
        }
      },
      onDragLeave: (_) => cleanup(),
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
