import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./App/NavBar";
import Home from "./App/Home/Home";
import Reports from "./App/Reports";
import About from "./App/About";
import Login from "./Authentication/Login";

export const AuthContext = createContext();

function Stack({ currentUser, authState }) {
  return (
    <AuthContext.Provider value={[currentUser, authState]}>
      {authState ? (
        <Router>
          <div className="flex flex-col h-screen">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      ) : (
        <Login />
      )}
      {/* <Login /> */}
    </AuthContext.Provider>
  );
}

export default Stack;
