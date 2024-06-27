// import "./App.css";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <div className="app">
//       <Home />
//     </div>
//   );
// }

import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserContext";

export default function App() {
  return (
    <UserProvider>
      <div className="app">
        <Outlet />
      </div>
    </UserProvider>
  );
}
