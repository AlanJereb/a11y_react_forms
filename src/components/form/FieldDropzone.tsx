import React, { useEffect } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Constants from "../../helpers/constants";

interface FieldDropzoneProps {
  position: "top" | "right" | "bottom" | "left";
  fieldWidth?: number;
  row: number;
  col: number;
}

const FieldDropzone = ({
  position,
  fieldWidth,
  row,
  col,
}: FieldDropzoneProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const expandedHeight = "calc(50px + 3rem)";
  const expandedWidth = `calc(${fieldWidth}px - 1.5rem)`; // -1.5rem deletes one padding ...max 2 columns per form

  useEffect(() => {
    return dropTargetForElements({
      element: ref.current!,
      canDrop: (args) => args.source.data.type === Constants.fieldTypeCard,
      onDragEnter: (_) => {
        setIsHovering(true);
      },
      onDragLeave: (_) => {
        setIsHovering(false);
      },
      onDrop: (args) => {
        // TODO move logic from Editor to here
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className={["field-dropzone", position].join(" ")}
      style={{
        height:
          (position === "top" || position === "bottom") && isHovering
            ? expandedHeight
            : undefined,
        width:
          (position === "left" || position === "right") && isHovering
            ? expandedWidth
            : undefined,
        left:
          position === "right" ? `calc(${fieldWidth}px - 1.5rem)` : undefined,
        right:
          position === "left" ? `calc(${fieldWidth}px - 1.5rem)` : undefined,
      }}
    />
  );
};

export default FieldDropzone;
