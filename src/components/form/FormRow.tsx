import React from "react";
import FormElement from "./FormElement";
import editorStore from "../../store/editorStore";

interface FormRowProps {
  rowIndex: number;
}

const FormRow = ({ rowIndex }: FormRowProps) => {
  const formElements = editorStore((state) => state.formElements);

  const rowElements = formElements[rowIndex];
  if (!rowElements) return null;

  return (
    <div className="components-form-form_row" key={rowIndex}>
      {rowElements.map(({ fieldType, id }, index) => (
        <FormElement
          key={id}
          fieldType={fieldType}
          id={id}
          col={index}
          row={rowIndex}
        />
      ))}
    </div>
  );
};

export default FormRow;
