import React, { useEffect, useRef } from "react";
import type { DraggableItem } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";
import Constants from "../../helpers/constants.js";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";


const FieldPlaceholder = (props: Pick<DraggableItem, "row" | "col">) => {
  const { row, col } = props;
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
