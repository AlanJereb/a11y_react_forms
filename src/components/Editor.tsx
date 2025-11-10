import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Constants, { placeholderFormElement } from "../helpers/constants";
import editorStore from "../store/editorStore";

const Editor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingElementId = editorStore((state) =>
    state.formElements.length === 0 ? state.draggingElementId : undefined,
  );
  const setDraggingElementId = editorStore.getState().setDraggingElementId;
  const removePlaceholderFormElement =
    editorStore.getState().removePlaceholderFormElement;
  const insertElementAt = editorStore.getState().insertElementAt;
  const formElementsAreEmpty = editorStore(
    (state) => state.formElements.length === 0,
  );

  const cleanup = () => {
    setDraggingElementId?.(undefined);
    const { formElements: fe } = editorStore.getState();
    const hasLonelyPlaceholder =
      fe.length === 1 &&
      fe[0]?.length === 1 &&
      fe[0]?.[0]?.id === Constants.fieldTypes.placeholder;
    if (hasLonelyPlaceholder) {
      removePlaceholderFormElement();
    }
  };

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (args) => {
        const id = args.source.data.id as string;
        if (editorStore.getState().draggingElementId !== id) {
          setDraggingElementId?.(id);
        }
        if (formElementsAreEmpty) {
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
  }, [formElementsAreEmpty]);

  return (
    <div ref={ref} className="component-editor">
      {formElementsAreEmpty ? (
        !draggingElementId ? (
          <div className="text-placeholder">
            {/* TODO Localization */}
            <p>{"Drop form fields here to build your form"}</p>
          </div>
        ) : null
      ) : (
        <FormCard />
      )}
    </div>
  );
};

export default Editor;
