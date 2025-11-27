import React from "react";
import FieldText from "./draggables/FieldText";
import Constants from "../helpers/constants";
import editorStore from "../store/editorStore";

const Sidebar = () => {
  const fieldFocusId = editorStore((state) => state.fieldFocusId);

  return (
    <div
      className={["component-sidebar", fieldFocusId ? "is-closed" : ""].join(
        " ",
      )}
    >
      <FieldText
        id={Constants.fieldTypes.text}
        fieldType={Constants.fieldTypes.text}
        row={0}
        col={0}
        label="Text field"
        disabled={true}
      />
    </div>
  );
};

export default Sidebar;
