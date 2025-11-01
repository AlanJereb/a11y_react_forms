import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem, FieldType } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";
import { AppContext } from "../../App";
import { findElementIndexes } from "../../helpers/formHelpers";
import { nanoid } from "nanoid";
import FieldDropzone from "./FieldDropzone";

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
  const [fieldWidth, setFieldWidth] = useState(0);
  const appContext = React.useContext(AppContext);
  const [isDragging, setIsDragging] = useState(false);

  if (!appContext) return null;

  useLayoutEffect(() => {
    if (ref.current) {
      setFieldWidth(ref.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        onDragStart: (args) => {
          // ----------------------------------------------------------------------
          // Add drop targets around editor elements
          // ----------------------------------------------------------------------
          appContext.setFormElements((prev) => {
            // const id = args.source.data.id as string;
            // // If the element we are dragging is from the sidebar
            // // we don't modify the current form elements
            // const elementIndexes = findElementIndexes(id, prev);
            // if (elementIndexes.row === -1 && elementIndexes.col === -1) return prev;

            // Draw placeholders dropzone around elements
            const newFormElements = [...prev];
            if (newFormElements.length === 0) {
              return [
                [
                  {
                    id: nanoid(),
                    fieldType: Constants.fieldTypes.placeholder,
                  },
                ],
              ];
            }

            // const newFormElements = { ...prev };
            // let i = 0;
            // Object.keys(prev).forEach((key) => {
            //   // Add placeholder before the current index
            //   if (i === index && i !== 0) {
            //     newFormElements[`placeholder-${id}-${i - 1}`] = Constants.fieldTypes.placeholder;
            //   }
            //   newFormElements[key] = prev[key]!;
            //   i++;
            // });
            return newFormElements;
          });
          // ----------------------------------------------------------------------
          setIsDragging(true);
        },
        onDrop: () => {
          // remove all placeholders after drop
          appContext.setFormElements((prev) => {
            // const newFormElements = { ...prev };
            // Object.keys(prev).forEach((key) => {
            //   if (!key.startsWith("placeholder-")) {
            //     newFormElements[key] = prev[key]!;
            //   }
            // });
            // return newFormElements;
            return prev;
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
    <div
      ref={ref}
      className={["field-base", isDragging ? "is-dragging" : ""].join(" ")}
    >
      {!Object.values(Constants.fieldTypes).includes(id as string) && (
        <>
          <FieldDropzone position="top" fieldWidth={fieldWidth} />
          <FieldDropzone position="right" fieldWidth={fieldWidth} />
          <FieldDropzone position="bottom" fieldWidth={fieldWidth} />
          <FieldDropzone position="left" fieldWidth={fieldWidth} />
        </>
      )}
      {label && <p className="field-base-label">{label}</p>}
      {children}
    </div>
  );
};

export default FieldBase;
