import { Route, BrowserRouter, Routes } from "react-router-dom";
import React from "react";

import CreatePoint from "./pages/CreatePoint";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
