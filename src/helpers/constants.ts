import type { FormElements } from "../types/types";

class Constants {
  static fieldTypes = {
    text: "fieldText",
    number: "fieldNumber",
    placeholder: "fieldPlaceholder",
  }
  // field types
  static fieldTypeCard = "card";
}

export const placeholderFormElement: FormElements = {
  fieldType: Constants.fieldTypes.placeholder,
  id: Constants.fieldTypes.placeholder,
};

export default Constants;