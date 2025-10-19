import React from "react";
import Constants from "../../helpers/constants";
import FieldText from "../draggables/FieldText";

interface FormElementProps {
  fieldType: string;
  id: string;
  index: number;
}

// Renders the correct type of form element based on the dropped item ID
const FormElement = ({ fieldType, id, index }: FormElementProps) => {
  switch (fieldType) {
    case Constants.fieldTypes.text:
      return <FieldText id={id} index={index} fieldType={fieldType} />;
    default:
      return null;
  }
};

export default FormElement;
