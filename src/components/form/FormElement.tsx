import React from "react";
import Constants from "../../helpers/constants";
import FieldText from "../draggables/FieldText";

interface FormElementProps {
  fieldType: string;
  id: string;
  row: number;
  col: number;
}

// Renders the correct type of form element based on the dropped item ID
const FormElement = ({ fieldType, id, row, col }: FormElementProps) => {
  switch (fieldType) {
    case Constants.fieldTypes.text:
      return <FieldText id={id} col={col} row={row} fieldType={fieldType} />;
    default:
      return null;
  }
};

export default FormElement;
