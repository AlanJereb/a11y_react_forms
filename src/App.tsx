import './App.css'
import { Editor, Sidebar } from './components/_all'

function App() {
  return (
    <>
      <div className="app_container">
        <Sidebar />
        <Editor />
      </div>  
    </>
  )
}

export default App
