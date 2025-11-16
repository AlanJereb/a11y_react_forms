import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants, { placeholderFormElement } from "../../helpers/constants";
import editorStore from "../../store/editorStore";

interface FieldDropzoneProps {
  position: "top" | "right" | "bottom" | "left";
  row: number;
  col: number;
}

const FieldDropzone = ({ position, row, col }: FieldDropzoneProps) => {
  const [isDraggedOver, setIsDraggedOver] = React.useState(false);
  const insertElementAt = editorStore.getState().insertElementAt;
  const isDraggedOverRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const placeholderAddedRef = useRef<String>(null);

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        if (!placeholderAddedRef.current) {
          placeholderAddedRef.current = position;

          setIsDraggedOver(true); // visual re-render
          isDraggedOverRef.current = true; // for cancellation

          const { formElements: fe } = editorStore.getState();
          const formElementsContainPlaceholder = fe.some((row) =>
            row.some((el) => el.id === Constants.fieldTypes.placeholder),
          );
          if (formElementsContainPlaceholder) {
            return; // do nothing if one already exists
          }
          // Wait 1 seconds before adding the placeholder to allow for quick drag-overs
          setTimeout(() => {
            if (!isDraggedOverRef.current) return;

            insertElementAt({
              element: placeholderFormElement,
              row,
              col,
              placeTo:
                position === "top" || position === "left" ? "before" : "after",
              destinationType:
                position === "left" || position === "right" ? "col" : "row",
            });
          }, 1000);
        }
      },
      onDragLeave: (_) => {
        placeholderAddedRef.current = null;
        setIsDraggedOver(false);
        isDraggedOverRef.current = false;
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "field-dropzone",
        position,
        isDraggedOver ? "is-dragged-over" : "",
      ].join(" ")}
    />
  );
};

export default FieldDropzone;
