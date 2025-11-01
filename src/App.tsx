import React from "react";
import { Editor, Sidebar } from "./components/_all";
import AppContextProvider from "./contexts/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <div className="app">
        <Sidebar />
        <Editor />
      </div>
    </AppContextProvider>
  );
}

export default App;
