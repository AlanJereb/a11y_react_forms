import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  type FC,
  type ReactNode,
} from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
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
  const { fieldWidth, isDragging } = editorStore(
    useShallow((state) => ({
      fieldWidth: state.fieldWidth[id] || 0,
      isDragging: state.fieldIsDragging[id] || false,
    })),
  );
  const setFieldWidth = editorStore.getState().setFieldWidth;
  const setFieldIsDragging = editorStore.getState().setFieldIsDragging;
  const hasLonelyPlaceholder = editorStore(
    (state) =>
      state.formElements.length === 1 &&
      state.formElements[0]?.length === 1 &&
      state.formElements[0]?.[0]?.id === Constants.fieldTypes.placeholder,
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setFieldWidth(id, ref.current.offsetWidth);
    }
  }, []);

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
              : hasLonelyPlaceholder
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
