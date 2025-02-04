import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './Home'
import Post from './Post'
import Update from "./Update"
import Play from "./Play"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post?" element={<Post />} />
        <Route path="/Update/:id" element={<Update />} />
        <Route path="/Play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;
