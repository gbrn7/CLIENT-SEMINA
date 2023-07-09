import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { listen } from "./redux/listener";
import { AppRoutes } from './routes/'

function App() {

  useEffect(() => {
    listen();
  }, []);


  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;

// The route path and browser router path have to same