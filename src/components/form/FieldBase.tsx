import React, { useEffect, useRef } from "react";
import {
  draggable
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";

interface FieldBaseProps extends DraggableItem {
  children?: React.ReactNode;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  itemId,
  index,
  label,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        getInitialData: () => ({
          type: Constants.fieldTypeCard,
          itemId: itemId,
        }),
      }),
    );
    return cleanup;
  }, [itemId]);

  return (
    <div ref={ref} className="p-[1.5rem]" key={`${itemId}-${index}`}>
      {label && <p className="text-start text-[1rem] font-medium">{label}</p>}
      {children}
    </div>
  );
};

export default FieldBase;
