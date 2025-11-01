import React, { useContext, useEffect, useRef } from "react";
import type { DraggableItem } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";
import Constants from "../../helpers/constants.js";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { AppContext } from "../../contexts/AppContextProvider.js";
import { nanoid } from "nanoid";

const FieldPlaceholder = (props: Pick<DraggableItem, "row" | "col">) => {
  const { row, col } = props;
  const appContext = useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = "is-hovered";

  if (!appContext) return null;

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragEnter: (_) => {
        ref.current?.classList.add(isHovered);
      },
      onDragLeave: (_) => {
        ref.current?.classList.remove(isHovered);
      },
      onDrop: (args) => {
        const fieldType = args.source.data
          .fieldType as DraggableItem["fieldType"];
        const id = args.source.data.id as string;
        if (fieldType && id) {
          appContext.setFormElements((prev) => {
            let newFormElements = [...prev];
            // swap placeholder with the dropped element
            newFormElements[row]?.splice(col, 1, {
              id: nanoid(),
              fieldType,
            });

            return newFormElements;
          });
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
