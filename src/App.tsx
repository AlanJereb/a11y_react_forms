import React from "react";
import { Editor, Sidebar } from "./components/_all";
import type { FormElements } from "./types/types";

export interface AppContextType {
  formElements: FormElements[][];
  setFormElements: React.Dispatch<React.SetStateAction<FormElements[][]>>;
  draggingElementId?: string;
  setDraggingElementId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const AppContext = React.createContext<AppContextType | null>(null);

function App() {
  const [formElements, setFormElements] = React.useState<FormElements[][]>([
    [],
  ]);
  const [draggingElementId, setDraggingElementId] = React.useState<string>();
  return (
    <AppContext.Provider
      value={{
        formElements,
        setFormElements,
        draggingElementId,
        setDraggingElementId,
      }}
    >
      <div className="app">
        <Sidebar />
        <Editor />
      </div>
    </AppContext.Provider>
  );
}

export default App;
