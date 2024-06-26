import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Cereals() {
  const navigate = useNavigate();
  const [cereals, setCereals] = useState([]);

  const getCereals = async () => {
    try {
      const { data } = await axiosWithAuth().get("/cereals");
      setCereals(data);
    } catch (error) {
      console.error("Error fetching cereals:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    else getCereals();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <h3>
        Cereals List <button onClick={logout}>Logout</button>
      </h3>
      {cereals.length > 0 ? (
        <div>
          {cereals.map((cereal) => (
            <div
              key={cereal.id}
              style={{ marginBottom: "20px" }}
              className="cereal"
            >
              <h4>{cereal.name}</h4>
              <p>Brand: {cereal.brand}</p>
              <p>Sugar content: {cereal.sugarContent}</p>
              <p>{cereal.history}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cereals found.</p>
      )}
    </div>
  );
}
