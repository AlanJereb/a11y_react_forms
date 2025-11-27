import React from "react";
import { Editor, Sidebar, Settings } from "./components/_all";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Editor />
      <Settings />
    </div>
  );
}

export default App;
