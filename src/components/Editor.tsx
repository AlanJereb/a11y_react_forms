import React, { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import FormCard from "./form/FormCard";
import FormTitle from "./form/FormTitle";
import Constants from "../helpers/constants";
import FieldText from "./draggables/FieldText";

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

  // Renders the correct type of form element based on the dropped item ID
  const renderFormElement = (itemId: string, index: number) => {
    switch (itemId) {
      case Constants.fieldTextFieldId:
        return <FieldText itemId={itemId} index={index} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={[
        "min-h-[400px]",
        "flex-7/10",
        "place-content-center",
        "rounded-t-[2rem]",
        "p-[2rem]",
        "inset-shadow-[-10px_-10px_10px_0_#FFFFFF70,10px_10px_10px_0_#AEAEC020]",
        "transition-all",
        "duration-200",
        "overflow-y-auto",
      ].join(" ")}
    >
      {/* Placeholder content when no fields are dropped */}
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
          {/* Placeholder content when fields are being dragged over */}
          {isDraggedOver && droppedItems.length === 0 && (
            <FormCard>
              <FormTitle text="Release to add field" />
            </FormCard>
          )}
          {/* Render the dropped form elements */}
          {droppedItems.length > 0 && (
            <FormCard>
              {droppedItems.map((itemId, index) => renderFormElement(itemId, index))}
            </FormCard>
          )
          }
        </div>
      )}
    </div>
  );
};

export default Editor;
