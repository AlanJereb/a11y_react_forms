import React from "react";
import { Editor, Sidebar } from "./components/_all";
import type { DraggableItem } from "./types/types";
import "./styles.css";

interface AppContextType {
  formElements: Map<string, DraggableItem["fieldType"]>;
  setFormElements: React.Dispatch<
    React.SetStateAction<Map<string, DraggableItem["fieldType"]>>
  >;
  draggingElementId?: string;
  setDraggingElementId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const AppContext = React.createContext<AppContextType | null>(null);

function App() {
  const [formElements, setFormElements] = React.useState<
    Map<string, DraggableItem["fieldType"]>
  >(new Map());
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
      <div className="bg-background flex h-screen w-screen gap-x-[4rem] px-[8rem] pt-[8rem]">
        <Sidebar />
        <Editor />
      </div>
    </AppContext.Provider>
  );
}

export default App;
