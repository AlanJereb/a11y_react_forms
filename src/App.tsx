import { Editor, Sidebar } from "./components/_all";
import "./styles.css";

function App() {
  return (
    <div className="bg-background flex h-full w-full gap-x-[4rem] p-[8rem]">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
