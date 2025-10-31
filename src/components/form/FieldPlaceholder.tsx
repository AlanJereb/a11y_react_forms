import React from "react";
import type { DraggableItem } from "../../types/types.js";
import FieldBase from "../form/FieldBase.js";
import { nanoid } from "nanoid";
import Constants from "../../helpers/constants.js";

const FieldPlaceholder = (props: Pick<DraggableItem, "index">) => {
  const { index } = props;

  return (
    <FieldBase
      id={nanoid()}
      fieldType={Constants.fieldTypes.placeholder}
      index={index}
    >
      <div
        className={[
          "bg-background",
          "w-full",
          "rounded-[1rem]",
          "border-none",
          "p-[1.2rem]",
          "text-[1.4rem]",
          "font-medium",
          "inset-shadow-[-5px_-5px_10px_0_#FFFFFF70,5px_5px_10px_0_#AEAEC020]",
          "outline-none",
          "hover:cursor-grab",
        ].join(" ")}
      />
    </FieldBase>
  );
};

export default FieldPlaceholder;
