import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import FormTitle from "./form/FormTitle";
import Constants from "../helpers/constants";
import FieldText from "./draggables/FieldText";
import type { DraggableItem } from "../types/types";
import { nanoid } from "nanoid";
import { AppContext } from "../App";

const Editor = () => {
  const appContext = React.useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!appContext) {
    return null;
  }

  useEffect(() => {
    const cleanup = dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) => appContext.setDraggingElementId?.(args.source.data.id as string),
      onDragLeave: () => appContext.setDraggingElementId?.(undefined),
      onDrop: (args) => {
        appContext.setDraggingElementId?.(undefined);
        const fieldType = args.source.data.fieldType as DraggableItem["fieldType"];
        if (fieldType) {
          appContext.setFormElements((prev) => new Map(prev).set(nanoid(), fieldType));
        }
      },
    });

    return cleanup;
  }, []);

  // Renders the correct type of form element based on the dropped item ID
  const renderFormElement = ({fieldType, id, index}: {fieldType: DraggableItem["fieldType"], id: string, index: number}) => {
    switch (fieldType) {
      case Constants.fieldTypes.text:
        return <FieldText id={id} index={index} fieldType={fieldType} />;
      default:
        return null;
    }
  };

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
      {appContext.formElements.size === 0 && !appContext.draggingElementId ? (
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
          {appContext.draggingElementId && appContext.formElements.size === 0 && (
            <FormCard>
              <FormTitle text="Release to add field" />
            </FormCard>
          )}
          {/* Render the dropped form elements */}
          {appContext.formElements.size > 0 && (
            <FormCard>
              {Array.from(appContext.formElements.entries()).map(([id, fieldType], index) => (
                <React.Fragment key={id}>
                  {renderFormElement({ fieldType, id, index })}
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
