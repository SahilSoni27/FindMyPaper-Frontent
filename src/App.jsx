import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import PreviousPaper from "./components/PreviousPaper";
import Home from "./components/Home/Home";
import Notes from "./components/Notes";
import ContactUs from "./components/ContactUs";
import Linkedin from "./components/Linkedin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/previouspaper" element={<PreviousPaper />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/linkedin" element={<Linkedin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
