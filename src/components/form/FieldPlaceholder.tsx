import React, { useEffect, useRef } from "react";
import type { DraggableItem } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";
import Constants from "../../helpers/constants.js";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { nanoid } from "nanoid";
import editorStore from "../../store/editorStore.js";

const FieldPlaceholder = (props: Pick<DraggableItem, "row" | "col">) => {
  const { row, col } = props;
  const setFormElements = editorStore.getState().setFormElements;
  const removePlaceholderFormElement = editorStore.getState().removePlaceholderFormElement;
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = "is-hovered";

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        ref.current?.classList.add(isHovered);
      },
      onDragLeave: (_) => {
        ref.current?.classList.remove(isHovered);
        removePlaceholderFormElement();
      },
      onDrop: (args) => {
        const fieldType = args.source.data
          .fieldType as DraggableItem["fieldType"];
        const id = args.source.data.id as string;
        if (fieldType && id) {
          const { formElements } = editorStore.getState();
          const newFormElements = [...formElements];
          // swap placeholder with the dropped element
          newFormElements[row]?.splice(col, 1, {
            id: nanoid(),
            fieldType,
          });
          setFormElements(newFormElements);
        }
      },
    });
  }, []);

  return (
    <FieldBase
      id={Constants.fieldTypes.placeholder}
      fieldType={Constants.fieldTypes.placeholder}
      row={row}
      col={col}
    >
      <div ref={ref} className="component-form-field-placeholder" />
    </FieldBase>
  );
};

export default FieldPlaceholder;
