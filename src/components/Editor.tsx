import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import FormTitle from "./form/FormTitle";
import Constants from "../helpers/constants";
import FieldText from "./draggables/FieldText";
import type { DraggableItem } from "../types/types";
import { nanoid } from "nanoid";
import { AppContext } from "../App";
import {
  areAllElementsEmpty,
  findElementIndexes,
} from "../helpers/formHelpers";
import FormRow from "./form/FormRow";

const Editor = () => {
  const appContext = React.useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!appContext) return null;

  useEffect(() => {
    const cleanup = dropTargetForElements({
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
              newFormElements[0]![0] = { id: nanoid(), fieldType };
            }
            
            if (indexes.row !== -1 && indexes.col !== -1) {
              // FIXME: temporary add it to a new row
              newFormElements[indexes.row + 1] = [{
                id: nanoid(),
                fieldType,
              }];
            }
            return newFormElements;
          });
        }
      },
    });

    return cleanup;
  }, []);


  return (
    <div
      ref={ref}
      className={[
        "min-h-[400px]",
        "flex-7/10",
        "place-content-center",
        "rounded-t-[2rem]",
        "p-[2rem]",
        "inset-shadow-[-10px_-10px_10px_0_#FFFFFF70,10px_10px_10px_0_#AEAEC020]",
        "transition-all",
        "duration-200",
        "overflow-y-auto",
      ].join(" ")}
    >
      {/* Placeholder content when no fields are dropped */}
      {areAllElementsEmpty(appContext.formElements) &&
      !appContext.draggingElementId ? (
        <div
          className={[
            "text-placeholder",
            "flex",
            "h-full",
            "items-center",
            "justify-center",
          ].join(" ")}
        >
          <p className="text-[1.2rem]">
            Drop form fields here to build your form
          </p>
        </div>
      ) : (
        <div>
          {/* Placeholder content when fields are being dragged over */}
          {appContext.draggingElementId &&
            areAllElementsEmpty(appContext.formElements) && (
              <FormCard>
                <FormTitle text="Release to add field" />
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
