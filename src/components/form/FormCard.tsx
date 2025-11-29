import React, { useEffect, useRef } from "react";
import FormRow from "./FormRow";
import { useShallow } from "zustand/shallow";
import editorStore from "../../store/editorStore";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants from "../../helpers/constants";

const FormCard = () => {
  const { formElements } = editorStore(
    useShallow((state) => ({
      formElements: state.formElements,
    })),
  );
  const removePlaceholderFormElement =
    editorStore.getState().removePlaceholderFormElement;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      onDragLeave: (_) => {
        const { formElements: fe } = editorStore.getState();
        const hasLonelyPlaceholder =
          fe.length === 1 &&
          fe[0]?.length === 1 &&
          fe[0]?.[0]?.id === Constants.fieldTypes.placeholder;
        if (!hasLonelyPlaceholder) {
          removePlaceholderFormElement();
        }
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
