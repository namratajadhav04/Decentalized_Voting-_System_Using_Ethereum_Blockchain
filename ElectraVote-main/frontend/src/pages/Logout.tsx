import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { AuthContext } from "../contexts/Auth"; 

const SignOut: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await auth.signOut(); 
        authContext.logout();  
        navigate("/home"); 
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };

    signOutUser();
  }, [authContext, navigate]);

  return <div>Signing you out...</div>; 
};

export default SignOut;
