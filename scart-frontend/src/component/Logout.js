import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Logout.css'; // import the CSS file

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://127.0.0.1:10000/logout");

      // If logout was successful, remove the user from local storage
      if(response.data.message === 'Logged out') {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout user", error);
    }
  };

  return (
    <div>
      <button className="Logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
