import React, { useEffect, useRef, type FC, type ReactNode } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";
import FieldDropzone from "./FieldDropzone";
import editorStore from "../../store/editorStore";
import { useShallow } from "zustand/shallow";

interface FieldBaseProps extends DraggableItem {
  children?: ReactNode;
}

const FieldBase: FC<FieldBaseProps> = ({
  id,
  fieldType,
  label,
  children,
  row,
  col,
}) => {
  const [isDraggedOver, setIsDraggedOver] = React.useState(false);
  const { isDragging } = editorStore(
    useShallow((state) => ({
      isDragging: state.fieldIsDragging[id] || false,
    })),
  );
  const setFieldIsDragging = editorStore.getState().setFieldIsDragging;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        onDragStart: (_) => {
          setFieldIsDragging(id, true);
        },
        onDrop: () => {
          setFieldIsDragging(id, false);
        },
        getInitialData: () => ({
          type: Constants.fieldTypeCard,
          id: id,
          fieldType: fieldType,
        }),
      }),
      dropTargetForElements({
        element: ref.current!,
        onDragEnter: () => {
          setIsDraggedOver(true);
        },
        onDragLeave: () => {
          setIsDraggedOver(false);
        },
      }),
    );
    return cleanup;
  }, [id]);

  return (
    <div
      ref={ref}
      className={["field-base", isDragging ? "is-dragging" : ""].join(" ")}
    >
      <div className="field-base-content">
        {!Object.values(Constants.fieldTypes).includes(id) &&
          id !== Constants.fieldTypes.placeholder && isDraggedOver && (
            <>
              <FieldDropzone position="top" row={row} col={col} />
              <FieldDropzone position="right" row={row} col={col} />
              <FieldDropzone position="bottom" row={row} col={col} />
              <FieldDropzone position="left" row={row} col={col} />
            </>
          )}
        {label && <p className="field-base-label">{label}</p>}
        {children}
      </div>
    </div>
  );
};

export default FieldBase;
