// utils/auth.ts

// Check if the user is authenticated based on the presence of a token
export function isAuthenticated(): boolean {
  const authToken = localStorage.getItem("authToken");
  return !!authToken; // Returns true if token exists
}

// Check if the user has admin privileges based on user role
export function userIsAdmin(): boolean {
  const userRole = localStorage.getItem("userRole");
  return userRole === "admin"; // Returns true if user role is "admin"
}
