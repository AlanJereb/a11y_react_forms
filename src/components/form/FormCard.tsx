import React, { useEffect, useRef } from "react";
import FormRow from "./FormRow";
import { useShallow } from "zustand/shallow";
import editorStore from "../../store/editorStore";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const FormCard = () => {
  const { formElements } = editorStore(
    useShallow((state) => ({
      formElements: state.formElements,
    })),
  );
  const removePlaceholderFormElement = editorStore.getState().removePlaceholderFormElement;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragLeave: (_) => {
        removePlaceholderFormElement();
      },
    });
  }, []);

  return (
    <div ref={ref} className="components-form-form_card">
      {formElements.map((_, rowIndex) => {
        const rowKey = formElements[rowIndex]
          ? formElements[rowIndex].map((el) => el.id).join("-")
          : `row-${rowIndex}`;
        return <FormRow key={rowKey} rowIndex={rowIndex} />;
      })}
    </div>
  );
};

export default FormCard;
