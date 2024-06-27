// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Prompt from "./pages/prompt";
import LoginSignUp from "./pages/login-signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/payment";
import UserProfile from "./pages/userProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "prompt",
        element: <Prompt />,
      },
      {
        path: "plan",
        element: <Payment plan_="Basic" />,
      },
      {
        path: "plan+",
        element: <Payment plan_="Premium" />,
      },
      {
        path: "login-signup",
        element: <LoginSignUp form="Login" />,
      },
      {
        path: "login-signup+",
        element: <LoginSignUp form="Sign Up" />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// import React from "react";
// // import ReactDOM from "react-dom";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import { Link } from "react-router-dom";
// import App from "./App"; // Assuming your main component is named App
// import Prompt from "./pages/prompt";
// import LoginSignUp from "./pages/login-signup";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Payment from "./pages/payment";
// import UserProfile from "./pages/userProfile";
// import { UserProvider } from "./components/UserContext";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/prompt",
//     element: <Prompt />,
//   },
//   {
//     path: "/plan",
//     element: <Payment plan_="Basic" />,
//   },
//   {
//     path: "/plan+",
//     element: <Payment plan_="Premium" />,
//   },
//   {
//     path: "/login-signup",
//     element: <LoginSignUp form="Login" />,
//   },
//   {
//     path: "/login-signup+",
//     element: <LoginSignUp form="Sign Up" />,
//   },
//   {
//     path: "/about-us",
//     element: <About />,
//   },
//   {
//     path: "/contact-us",
//     element: <Contact />,
//   },
//   {
//     path: "/userProfile",
//     element: <UserProfile />,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <UserProvider>
//       <RouterProvider router={router} />
//     </UserProvider>
//   </React.StrictMode>
// );
