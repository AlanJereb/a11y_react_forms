import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Constants, { placeholderFormElement } from "../helpers/constants";
import FormRow from "./form/FormRow";
import editorStore from "../store/editorStore";
import { useShallow } from "zustand/shallow";

const Editor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    formElements,
    draggingElementId,
    setDraggingElementId,
    removePlaceholderFormElement,
    insertElementAt,
  } = editorStore(
    useShallow((state) => ({
      formElements: state.formElements,
      draggingElementId: state.draggingElementId,
      setDraggingElementId: state.setDraggingElementId,
      removePlaceholderFormElement: state.removePlaceholderFormElement,
      insertElementAt: state.insertElementAt,
    })),
  );

  const cleanup = () => {
    setDraggingElementId?.(undefined);
    removePlaceholderFormElement();
  };

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) => {
        setDraggingElementId?.(args.source.data.id as string);
        if (formElements.length === 0) {
          // Set initial placeholder row element
          insertElementAt({
            element: placeholderFormElement,
            row: 0,
            col: 0,
            placeTo: "before",
            destinationType: "row",
          });
        }
      },
      onDragLeave: () => cleanup(),
      onDrop: (_) => cleanup(),
    });
  }, [formElements]);

  return (
    <div ref={ref} className="component-editor">
      {formElements.length === 0 ? (
        !draggingElementId ? (
          <div className="text-placeholder">
            {/* TODO Localization */}
            <p>{"Drop form fields here to build your form"}</p>
          </div>
        ) : null
      ) : (
        <FormCard>
          {formElements.map((_, rowIndex) => (
            <FormRow key={rowIndex} rowIndex={rowIndex} />
          ))}
        </FormCard>
      )}
    </div>
  );
};

export default Editor;
