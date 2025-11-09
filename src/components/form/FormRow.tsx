import React, { Fragment } from "react";
import FormElement from "./FormElement";
import editorStore from "../../store/editorStore";

interface FormRowProps {
  rowIndex: number;
}

const FormRow = ({ rowIndex }: FormRowProps) => {
  const formElements = editorStore((state) => state.formElements);

  const rowElements = formElements[rowIndex];
  if (!rowElements) return null;

  return rowElements.map(({ fieldType, id }, index) => (
    <Fragment key={id}>
      <FormElement fieldType={fieldType} id={id} col={index} row={rowIndex} />
    </Fragment>
  ));
};

export default FormRow;
