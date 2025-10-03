import React from "react";
import FieldText from "./draggables/FieldText";

const Sidebar = () => {
  return (
    <div className="flex-3/10 max-w-[450px] rounded-[2rem] shadow-[-10px_-10px_30px_0_#FFFFFF,10px_10px_30px_0_#AEAEC040]">
      <FieldText itemId="field--text" />
    </div>
  );
};

export default Sidebar;
