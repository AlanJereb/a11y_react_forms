import React, { Fragment, useContext } from "react";
import FormElement from "./FormElement";
import { AppContext } from "../../contexts/AppContextProvider";

interface FormRowProps {
  rowIndex: number;
}

const FormRow = ({ rowIndex }: FormRowProps) => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const rowElements = appContext.formElements[rowIndex];
  if (!rowElements) return null;

  return rowElements.map(({ fieldType, id }, index) => (
    <Fragment key={id}>
      <FormElement fieldType={fieldType} id={id} col={index} row={rowIndex} />
    </Fragment>
  ));
};

export default FormRow;
