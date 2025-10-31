import React from "react";
import type { DraggableItem } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";

const FieldText = (props: DraggableItem) => {
  const { id, fieldType, index, label, disabled } = props;

  return (
    <FieldBase id={id} fieldType={fieldType} index={index} label={label}>
      <input
        type="text"
        // TODO localization
        placeholder="Enter title"
        className="field-text"
        disabled={disabled}
      />
    </FieldBase>
  );
};

export default FieldText;
