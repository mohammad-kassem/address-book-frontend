import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import UpdateContact from "./pages/UpdateContact";
import AddContact from "./pages/AddContact";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/contacts/:id" element={<UpdateContact />}></Route>
        <Route path="/contacts/add" element={<AddContact />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
