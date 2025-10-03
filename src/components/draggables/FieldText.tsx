import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { DraggableItem, DraggableState } from "../../types/types";

const FieldText = (props: DraggableItem) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const itemId = props.itemId;
  const [state, setState] = useState<DraggableState>("idle");

  useEffect(() => {
    const cleanup = combine(
      draggable({
        element: ref.current!,
        getInitialData: () => ({ type: "card", itemId: itemId }),
      }),
      dropTargetForElements({
        element: ref.current!,
        canDrop: (args) => args.source.data.type === "card",
      }),
    );
    return cleanup;
  }, [itemId]);

  return (
    <div className="p-[1.5rem]">
      <p className="text-[1rem] font-medium">Text Field</p>
      <div ref={ref}>
        <input
          type="text"
          placeholder="Enter title"
          className="bg-background w-full rounded-[1rem] border-none p-[1.2rem] text-[1.4rem] font-medium inset-shadow-[-5px_-5px_10px_0_#FFFFFF70,5px_5px_10px_0_#AEAEC020] outline-none"
        />
      </div>
    </div>
  );
};

export default FieldText;
