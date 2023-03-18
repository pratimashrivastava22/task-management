import { Routes, Route } from "react-router-dom"
import TaskList from "./TaskList/TaskList"
import TaskDetail from "./TaskDetail/TaskDetail"

function App() {
  return (
    <div className="App" data-testid='app'>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/taskDetail/:id" element={<TaskDetail />} />
        <Route path="*" element={<div>Route Not found</div>} />
      </Routes>
    </div>
  )
}

export default App