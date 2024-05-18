import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import { RecoilRoot } from "recoil";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <main>
          <Routes>
            <Route path={"/"} element={<SearchPage />} />
            <Route path={"/:type/:id"} element={<DetailsPage />} />
          </Routes>
        </main>
      </Router>
    </RecoilRoot>
  );
}

export default App;
