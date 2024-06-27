import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // localStorage.setItem("username", JSON.stringify(userData));
    localStorage.setItem("username", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// import React, { createContext, useState, useEffect } from "react";

// // Create a Context for the user
// export const UserContext = createContext();

// // Create a Provider component
// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(localStorage.getItem("username"));

//   useEffect(() => {
//     // Fetch user from localStorage or an API
//     const loggedUser = localStorage.getItem("username"); // Example: fetching from localStorage
//     if (loggedUser) {
//       console.log(loggedUser);
//       setUserData(loggedUser);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
