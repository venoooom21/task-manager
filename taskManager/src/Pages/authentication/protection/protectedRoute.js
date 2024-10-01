// components/ProtectedRoute.js
import React from 'react'; // Import React for creating the component.
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom to redirect users.

const ProtectedRoute = ({ children }) => {
  // This component receives `children` as a prop. `children` refers to the component(s) that will be rendered when this route is accessed.
  
  // This line checks if the user is authenticated.
  // `localStorage.getItem('token')` attempts to retrieve a value called `token` from the browser's localStorage.
  // If it exists, the `!!` converts it to a boolean `true`, otherwise it will be `false`.
  const isAuthenticated = !!localStorage.getItem('token');

  // If `isAuthenticated` is `true`, it means the user is authenticated, and the `children` components will be rendered.
  // Otherwise, the user will be redirected to the "/signin" route.
  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
