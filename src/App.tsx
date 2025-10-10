import React from "react";
import { Editor, Sidebar } from "./components/_all";
import "./styles.css";

function App() {
  return (
    <div className="bg-background flex h-screen w-screen gap-x-[4rem] px-[8rem] pt-[8rem]">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
