import React, { useContext, useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Constants, { placeholderFormElement } from "../helpers/constants";
import FormRow from "./form/FormRow";
import { AppContext } from "../contexts/AppContextProvider";
import {
  insertElementAt,
  removePlaceholderFormElement,
} from "../helpers/formHelpers";

const Editor = () => {
  const appContext = useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!appContext) return null;

  const cleanup = () => {
    appContext.setDraggingElementId?.(undefined);
    appContext.setFormElements((prev) => removePlaceholderFormElement(prev));
  };

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) => {
        appContext.setDraggingElementId?.(args.source.data.id as string);
        if (appContext.formElements.length === 0) {
          // Set initial placeholder row element
          appContext.setFormElements((prev) => {
            return insertElementAt({
              element: placeholderFormElement,
              formElements: prev,
              row: 0,
              col: 0,
              placeTo: "before",
              destinationType: "row",
            });
          });
        }
      },
      onDragLeave: () => cleanup(),
      onDrop: (_) => cleanup(),
    });
  }, []);

  return (
    <div ref={ref} className="component-editor">
      {appContext.formElements.length === 0 ? (
        !appContext.draggingElementId ? (
          <div className="text-placeholder">
            {/* TODO Localization */}
            <p>{"Drop form fields here to build your form"}</p>
          </div>
        ) : null
      ) : (
        <FormCard>
          {appContext.formElements.map((el, rowIndex) => (
            <FormRow key={rowIndex} rowIndex={rowIndex} />
          ))}
        </FormCard>
      )}
    </div>
  );
};

export default Editor;
