import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Link } from "react-router-dom";
import App from "./App"; // Assuming your main component is named App
import Prompt from "./pages/prompt";
import LoginSignUp from "./pages/login-signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/prompt",
    element: <Prompt />,
  },
  {
    path: "/plan",
    element: <Payment />,
  },
  {
    path: "/login-signup",
    element: <LoginSignUp form="Login" />,
  },
  {
    path: "/login-signup+",
    element: <LoginSignUp form="Sign Up" />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
