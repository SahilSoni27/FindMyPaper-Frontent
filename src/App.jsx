// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import Sidebar from "./components/sidebar/Sidebar";
// import PreviousPaper from "./components/PreviousPaper";
// import Home from "./components/Home/Home";
// import Login from "./components/login";
// import Notes from "./components/Notes";
// import ContactUs from "./components/ContactUs";
// import Linkedin from "./components/Linkedin";
// import { createContext, useState } from "react";

// export const UserContext = createContext();

// function App() {
//   const [user, setUser] = useState({});

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       <UserContext.Consumer>
//         {() => (
//           <BrowserRouter>
//             <Sidebar />
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/previouspaper" element={<PreviousPaper />} />
//               <Route path="/notes" element={<Notes />} />
//               <Route path="/contactus" element={<ContactUs />} />
//               <Route path="/linkedin" element={<Linkedin />} />
//             </Routes>
//           </BrowserRouter>
//         )}
//       </UserContext.Consumer>
//     </UserContext.Provider>
//   );
// }

// export default App;



import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import PreviousPaper from "./components/PreviousPaper";
import Home from "./components/Home/Home";
import Login from "./components/login";
import Notes from "./components/Notes";
import ContactUs from "./components/ContactUs";
import Linkedin from "./components/Linkedin";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Alumini from "./components/Alumini";

export const UserContext = createContext();

function AppContent() {
  const location = useLocation();
  const hideSidebarRoutes = ["/linkedin"];

  return (
    <>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/previouspaper" element={<PreviousPaper />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/linkedin" element={<Linkedin />} />
        <Route path="/alumni-list" element = {<Alumini/>} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
