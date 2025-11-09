import React from "react";
import FormRow from "./FormRow";
import { useShallow } from "zustand/shallow";
import editorStore from "../../store/editorStore";

const FormCard = () => {
  const { formElements } = editorStore(
    useShallow((state) => ({
      formElements: state.formElements,
    })),
  );

  return (
    <div className="components-form-form_card">
      {formElements.map((_, rowIndex) => (
        <FormRow key={rowIndex} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

export default FormCard;
