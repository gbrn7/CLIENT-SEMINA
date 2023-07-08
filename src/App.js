import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import PageSignin from './pages/signIn';
import PageDashboard from "./pages/dashboard";
import PageCategories from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import CategoriesEdit from "./pages/categories/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<PageSignin />} />
        <Route path="/" element={<PageDashboard />} />
        <Route path="/categories" element={<PageCategories />} />
        <Route path="/categories/create" element={<CategoriesCreate />} />
        <Route path="/categories/edit/:" element={<CategoriesEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

// The route path and browser router path have to same