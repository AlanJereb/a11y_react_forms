import React from "react";
import FieldText from "./draggables/FieldText";
import Constants from "../helpers/constants";

const Sidebar = () => {
  return (
    <div className="component-sidebar">
      <FieldText
        id={Constants.fieldTypes.text}
        fieldType={Constants.fieldTypes.text}
        index={0}
        label="Text field"
        disabled={true}
      />
    </div>
  );
};

export default Sidebar;
