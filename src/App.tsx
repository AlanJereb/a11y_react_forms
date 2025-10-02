import { Editor, Sidebar } from "./components/_all";
import "./styles.css";

function App() {
  return (
    <div className="h-full w-full flex gap-x-[4rem] bg-background p-[8rem]">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
