/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import { SignInSide, SignUp } from "./components";
import routes from "./Routes";
import './App.css';

function App() {
  return (  
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
  );
}

export default App;
