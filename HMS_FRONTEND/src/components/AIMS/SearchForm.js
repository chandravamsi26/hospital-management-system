import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/patients/search-results", { keyword });

      // Navigate to results page with matched patients
      navigate("/search-results", { state: { results: response.data } });
    } catch (error) {
      console.error("Search error:", error);
      alert("Something went wrong while searching.");
    }
  };

  return (
    <div className="search-container">
      <h2>Search Previous Surveys</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter First or Last Name</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter first or last name..."
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
