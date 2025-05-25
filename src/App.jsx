import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./assets/style/style.scss"
import LokHome from "./view/LokHome"
import LokHeader from "./view/common/LokHeader"
function App() {
  return (
    <BrowserRouter>
      <LokHeader />
      <Routes>
        <Route path="/" element={<LokHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
