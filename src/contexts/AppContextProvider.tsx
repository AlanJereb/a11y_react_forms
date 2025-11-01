import React, { createContext, useState } from "react";
import type { FormElements } from "../types/types";

export interface AppContextType {
  formElements: FormElements[][];
  setFormElements: React.Dispatch<React.SetStateAction<FormElements[][]>>;
  draggingElementId?: string;
  setDraggingElementId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [formElements, setFormElements] = useState<FormElements[][]>([[]]);
  const [draggingElementId, setDraggingElementId] = useState<string>();
  return (
    <AppContext.Provider
      value={{
        formElements,
        setFormElements,
        draggingElementId,
        setDraggingElementId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
