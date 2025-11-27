import React from "react";
import editorStore from "../store/editorStore";

const Settings = () => {
  const fieldFocusId = editorStore((state) => state.fieldFocusId);

  return (
    <div
      className={["component-settings", fieldFocusId ? "is-open" : ""].join(
        " ",
      )}
    >
      TODO
    </div>
  );
};

export default Settings;
