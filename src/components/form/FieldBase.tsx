import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../../types/types";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import Constants from "../../helpers/constants";
import FieldDropzone from "./FieldDropzone";
import editorStore from "../../store/editorStore";

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
  const formElements = editorStore((state) => state.formElements);
  const ref = useRef<HTMLDivElement | null>(null);
  const [fieldWidth, setFieldWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      setFieldWidth(ref.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = combine(
      draggable({
        element: ref.current!,
        onDragStart: (_) => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
        getInitialData: () => ({
          type: Constants.fieldTypeCard,
          id: id,
          fieldType: fieldType,
        }),
      }),
    );
    return cleanup;
  }, [id]);

  return (
    <div
      ref={ref}
      className={["field-base", isDragging ? "is-dragging" : ""].join(" ")}
    >
      <div
        className="field-base-content"
        style={{
          // position absolute on all placeholder elements but the first one to prevent
          // the layout shift
          position:
            fieldType !== Constants.fieldTypes.placeholder
              ? "relative"
              : formElements.length === 1
                ? "relative"
                : "absolute",
        }}
      >
        {!Object.values(Constants.fieldTypes).includes(id) &&
          id !== Constants.fieldTypes.placeholder && (
            <>
              <FieldDropzone
                position="top"
                fieldWidth={fieldWidth}
                row={row}
                col={col}
              />
              <FieldDropzone
                position="right"
                fieldWidth={fieldWidth}
                row={row}
                col={col}
              />
              <FieldDropzone
                position="bottom"
                fieldWidth={fieldWidth}
                row={row}
                col={col}
              />
              <FieldDropzone
                position="left"
                fieldWidth={fieldWidth}
                row={row}
                col={col}
              />
            </>
          )}
        {label && <p className="field-base-label">{label}</p>}
        {children}
      </div>
    </div>
  );
};

export default FieldBase;
