import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants, { placeholderFormElement } from "../../helpers/constants";
import editorStore from "../../store/editorStore";

interface FieldDropzoneProps {
  position: "top" | "right" | "bottom" | "left";
  row: number;
  col: number;
}

const FieldDropzone = ({
  position,
  row,
  col,
}: FieldDropzoneProps) => {
  const insertElementAt = editorStore.getState().insertElementAt;
  const ref = useRef<HTMLDivElement>(null);
  const placeholderAddedRef = useRef<String>(null);

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        if (!placeholderAddedRef.current) {
          placeholderAddedRef.current = position;
          const { formElements: fe } = editorStore.getState();
          const formElementsContainPlaceholder = fe.some((row) =>
            row.some((el) => el.id === Constants.fieldTypes.placeholder),
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
      onDragLeave: (_) => (placeholderAddedRef.current = null),
    });
  }, []);

  return <div ref={ref} className={["field-dropzone", position].join(" ")} />;
};

export default FieldDropzone;
