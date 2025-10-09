import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import Title from "./form/FormTitle";
import Constants from "../helpers/constants";

const Editor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  useEffect(() => {
    const cleanup = dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: (args) => {
        setIsDraggedOver(false);
        const itemId = args.source.data.itemId as string;
        if (itemId) {
          setDroppedItems((prev) => [...prev, itemId]);
        }
      },
    });

    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "min-h-[400px]",
        "flex-7/10",
        "place-content-center",
        "rounded-[2rem]",
        "p-[2rem]",
        "inset-shadow-[-10px_-10px_10px_0_#FFFFFF70,10px_10px_10px_0_#AEAEC020]",
        "transition-all",
        "duration-200",
      ].join(" ")}
    >
      {droppedItems.length === 0 && !isDraggedOver ? (
        <div
          className={[
            "text-placeholder",
            "flex",
            "h-full",
            "items-center",
            "justify-center",
          ].join(" ")}
        >
          <p className="text-[1.2rem]">
            Drop form fields here to build your form
          </p>
        </div>
      ) : (
        <div>
          {isDraggedOver && droppedItems.length === 0 ? (
            <FormCard>
              <Title text="Release to add field" />
            </FormCard>
          ) : null}
          {droppedItems.map((itemId, index) => (
            <div
              key={`${itemId}-${index}`}
              className={[
                "rounded-[1rem]",
                "border",
                "border-gray-200",
                "bg-white",
                "p-[1rem]",
                "shadow-sm",
                "transition-colors",
                "hover:border-gray-300",
              ].join(" ")}
            >
              <p className="text-placeholder font-medium">{itemId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;
