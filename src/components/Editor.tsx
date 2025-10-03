import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Editor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  useEffect(() => {
    const cleanup = dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === "card",
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
      className={`min-h-[400px] flex-7/10 rounded-[2rem] p-[2rem] transition-all duration-200 ${
        isDraggedOver
          ? "bg-blue-50 inset-shadow-[-10px_-10px_15px_0_#FFFFFF90,10px_10px_15px_0_#AEAEC040]"
          : "inset-shadow-[-10px_-10px_10px_0_#FFFFFF70,10px_10px_10px_0_#AEAEC020]"
      }`}
    >
      {droppedItems.length === 0 ? (
        <div className="flex h-full items-center justify-center text-placeholder">
          <p className="text-[1.2rem]">
            Drop form fields here to build your form
          </p>
        </div>
      ) : (
        <div className="space-y-[1rem]">
          {droppedItems.map((itemId, index) => (
            <div
              key={`${itemId}-${index}`}
              className="rounded-[1rem] border border-gray-200 bg-white p-[1rem] shadow-sm"
            >
              <p className="text-placeholder">{itemId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;
