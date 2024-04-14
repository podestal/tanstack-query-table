import StudentsTable from "./components/StudentsTable"
import SimpleTable from "./components/SimpleTable"
import { useState } from "react"

const App = () => {

  const [name, setName] = useState('')

  return (
    <div>
      <StudentsTable />
      {/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
    </div>
  )
}

export default App
