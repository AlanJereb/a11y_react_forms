import { Editor, Sidebar } from "./components/_all";
import "./styles.css";

function App() {
  return (
    <div className="h-full w-full">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
