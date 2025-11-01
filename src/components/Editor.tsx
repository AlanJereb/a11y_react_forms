import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Constants from "../helpers/constants";
import type { DraggableItem } from "../types/types";
import { nanoid } from "nanoid";
import { AppContext } from "../App";
import {
  areAllElementsEmpty,
  findElementIndexes,
} from "../helpers/formHelpers";
import FormRow from "./form/FormRow";
import FieldPlaceholder from "./form/FieldPlaceholder";

const Editor = () => {
  const appContext = React.useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!appContext) return null;

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) =>
        appContext.setDraggingElementId?.(args.source.data.id as string),
      onDragLeave: () => appContext.setDraggingElementId?.(undefined),
      onDrop: (args) => {
        appContext.setDraggingElementId?.(undefined);
        const fieldType = args.source.data
          .fieldType as DraggableItem["fieldType"];
        const id = args.source.data.id as string;
        if (fieldType && id) {
          // appContext.setFormElements((prev) => ({ ...prev, [nanoid()]: fieldType }));
          const indexes = findElementIndexes(id, appContext.formElements);
          appContext.setFormElements((prev) => {
            // copy the previous form element array
            const newFormElements = [...prev];

            // If the dragged element is from the sidebar (not already in form elements)
            if (indexes.row === -1 && indexes.col === -1) {
              // add a new row to base state [[]]
              if (newFormElements.length === 0) {
                newFormElements[0]![0] = { id: nanoid(), fieldType };
              } else {
                // FIXME: temporary add a new element to the last row
                newFormElements.push([
                  {
                    id: nanoid(),
                    fieldType,
                  },
                ]);
              }
            }

            if (indexes.row !== -1 && indexes.col !== -1) {
              // FIXME: emporary add it to the last row
              if (indexes.row + 1 >= newFormElements.length) {
                newFormElements.push([
                  {
                    id: nanoid(),
                    fieldType,
                  },
                ]);
              }
            }
            return newFormElements;
          });
        }
      },
    });
  }, []);

  return (
    <div ref={ref} className="component-editor">
      {/* Placeholder content when no fields are dropped */}
      {areAllElementsEmpty(appContext.formElements) &&
      !appContext.draggingElementId ? (
        <div className="text-placeholder">
          {/* TODO Localization */}
          <p>{"Drop form fields here to build your form"}</p>
        </div>
      ) : (
        <div>
          {/* Placeholder content when fields are being dragged over */}
          {appContext.draggingElementId &&
            areAllElementsEmpty(appContext.formElements) && (
              <FormCard>
                <FieldPlaceholder row={0} col={0} />
              </FormCard>
            )}
          {/* Render the dropped form elements */}
          {!areAllElementsEmpty(appContext.formElements) && (
            <FormCard>
              {appContext.formElements.map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <FormRow rowIndex={rowIndex} />
                </React.Fragment>
              ))}
            </FormCard>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
