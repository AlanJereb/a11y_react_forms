import React, { useContext, useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Constants from "../helpers/constants";
import {
  areAllElementsEmpty,
} from "../helpers/formHelpers";
import FormRow from "./form/FormRow";
import FieldPlaceholder from "./form/FieldPlaceholder";
import { AppContext } from "../contexts/AppContextProvider";

const Editor = () => {
  const appContext = useContext(AppContext);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!appContext) return null;

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) =>
        appContext.setDraggingElementId?.(args.source.data.id as string),
      onDragLeave: () => appContext.setDraggingElementId?.(undefined),
      onDrop: (_) => {
        appContext.setDraggingElementId?.(undefined);
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
              {appContext.formElements.map((el, rowIndex) => (
                <FormRow
                  key={el[0]?.id || `row-${rowIndex}`}
                  rowIndex={rowIndex}
                />
              ))}
            </FormCard>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
