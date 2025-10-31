import React from "react";

interface FieldDropzoneProps {
  position: "top" | "right" | "bottom" | "left";
  fieldWidth?: number;
}

const FieldDropzone = ({ position, fieldWidth }: FieldDropzoneProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const expandedHeight = "h-[calc(50px+3rem)]";
  const expandedWidth = `w-[calc(${fieldWidth}px-1.5rem)]`; // -1.5rem deletes one padding ...max 2 columns per form

  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={[
        "bg-red-400",
        position === "top" || position === "bottom"
          ? "h-[1.5rem]"
          : "h-[calc(100%-3rem)]",
        position === "left" || position === "right"
          ? "w-[1.5rem]"
          : "w-[calc(100%-3rem)]",
        "absolute",
        position === "right"
          ? "right-0"
          : position === "top" || position === "bottom"
            ? "left-[1.5rem]"
            : "left-0",
        position === "left" || position === "right"
          ? "top-[1.5rem]"
          : position === "top"
            ? "top-0"
            : "bottom-0",
      ].join(" ")}
    />
  );
};

export default FieldDropzone;
