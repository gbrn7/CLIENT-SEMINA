import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import pageSignin from './components/Input';

function Home() {
  return <h1>Home</h1>;
}

function Categories() {

  let query = useQuery();

  console.log(query.get('page'));
  return (
    <>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><Link to="/categories/2344443">Seminar</Link></td>
          </tr>
          <tr>
            <td>2</td>
            <td><Link to="/categories/789654">Konser</Link></td>
          </tr>
        </tbody>
      </table>
    </>
  );

}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function CategoriesDetail() {
  let { id } = useParams(); {/* this method return object we can use destructuring object to collect value */ }
  return <h1>Categories : {id}</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Login() {
  let navigate = useNavigate();
  return (
    <>
      <h1>Login</h1>
      <button onClick={() => navigate('/')}>Submit</button >
    </>
  );
}

function Signin() {
  return pageSignin();
}

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signin">Signin</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoriesDetail />} />  {/*  This is how we can pass value id route  */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

// The route path and browser router path have to same