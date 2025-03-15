import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import PreviousPaper from "./components/PreviousPaper"
import Home from "./components/Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/previouspaper" element={<PreviousPaper />} />
        {/* <Route path="/notes" element={<Notes />} />
        <Route path="/contactus" element={<ContactUs />} /> */}
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
