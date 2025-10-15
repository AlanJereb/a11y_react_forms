import React from "react";
import type { DraggableItem, DraggableState } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";

const FieldText = (props: DraggableItem) => {
  const { id, fieldType, index, label, disabled } = props;

  return (
    <FieldBase id={id} fieldType={fieldType} index={index} label={label}>
      <input
        type="text"
        placeholder="Enter title"
        className="bg-background w-full rounded-[1rem] border-none p-[1.2rem] text-[1.4rem] font-medium inset-shadow-[-5px_-5px_10px_0_#FFFFFF70,5px_5px_10px_0_#AEAEC020] outline-none"
        disabled={disabled}
      />
    </FieldBase>
  );
};

export default FieldText;
