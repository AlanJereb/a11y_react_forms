import React from "react";
import { AppContext } from "../../App";
import FormElement from "./FormElement";

interface FormRowProps {
  rowIndex: number;
}

const FormRow = ({ rowIndex }: FormRowProps) => {
  const appContext = React.useContext(AppContext);
  if (!appContext) return null;

  const rowElements = appContext.formElements[rowIndex];
  if (!rowElements) return null;

  return rowElements.map(({ fieldType, id }, index) => (
    <React.Fragment key={id}>
      <FormElement fieldType={fieldType} id={id} col={index} row={rowIndex} />
    </React.Fragment>
  ));
};

export default FormRow;
