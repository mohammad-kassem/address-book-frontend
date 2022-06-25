import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import UpdateContact from "./pages/UpdateContact";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/contacts/:id" element={<UpdateContact />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
