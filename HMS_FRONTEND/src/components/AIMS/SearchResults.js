import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || [];
  const navigate = useNavigate();

  const handleViewSurvey = async (patient) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/surveys/by-patient-id/${patient.id}`);
      const survey = response.data;

      if (survey) {
        navigate("/result", {
          state: {
            patient,
            survey
          }
        });
      } else {
        alert("No survey data found for this patient.");
      }
    } catch (error) {
      console.error("Error fetching survey:", error);
      alert("Could not fetch survey for this patient.");
    }
  };

  return (
    <div className="container">
      <h2>Search Results</h2>
      {(!results || results.length === 0) ? (
        <h3>No matching patients found.</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Survey Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((p, index) => (
              <tr key={index}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.surveyDate}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewSurvey(p)}>
                    View Survey
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchResults;
