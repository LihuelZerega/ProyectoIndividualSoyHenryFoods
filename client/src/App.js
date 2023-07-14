import React from "react";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import CreateRecipe from "./Pages/FormPage/FormPage.jsx";
import DetailPage from "./Pages/DatailPage/DetailPage.jsx";
import { Route, Link, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Link to='/'></Link>
      <Link to='/HomePage'></Link>
      <Link to="/FormPage"></Link>
      

      <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path='/HomePage' element={< HomePage />} />
        <Route path="/recipes/:id" element={<DetailPage />} />
        <Route path="/FormPage" element={< CreateRecipe />} />
      </Routes>
    </>
  );
}

export default App;