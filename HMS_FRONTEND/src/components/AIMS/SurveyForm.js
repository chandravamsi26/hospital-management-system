import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SurveyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { patient } = location.state || {};

  const [survey, setSurvey] = useState({
    patientId: patient?.id || "",
    facialMuscles: 0,
    lipsPerioral: 0,
    jaw: 0,
    tongue: 0,
    upperExtremities: 0,
    lowerExtremities: 0,
    neckShouldersHips: 0,
    severityOfMovements: 0,
    incapacitationDueToMovements: 0,
    patientAwareness: 0,
    emotionalDistress: 0,
    globalRating: 0,
    otherIssues: "", //New field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prev) => ({
      ...prev,
      [name]: name === "otherIssues" ? value : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/surveys", survey);

      // Navigate to results page with patient and survey data
      navigate("/result", {
        state: {
          patient: patient,
          survey: response.data,
        },
      });
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey. Please try again.");
    }
  };

  if (!patient) {
    return <p>Patient information not available. Please start from the home page.</p>;
  }

  const renderSelect = (label, name) => (
    <div className="form-group">
      <label>{label}</label>
      <select name={name} value={survey[name]} onChange={handleChange} required>
        <option value="0">--Select--</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="survey-container">
      <h2>AIMS Survey for {patient.firstName} {patient.lastName}</h2>
      <form onSubmit={handleSubmit}>
        {renderSelect("1. Facial Muscles", "facialMuscles")}
        {renderSelect("2. Lips & Perioral Area", "lipsPerioral")}
        {renderSelect("3. Jaw", "jaw")}
        {renderSelect("4. Tongue", "tongue")}
        {renderSelect("5. Upper Extremities", "upperExtremities")}
        {renderSelect("6. Lower Extremities", "lowerExtremities")}
        {renderSelect("7. Neck, Shoulders, Hips", "neckShouldersHips")}
        {renderSelect("8. Severity of Movements", "severityOfMovements")}
        {renderSelect("9. Incapacitation Due to Movements", "incapacitationDueToMovements")}
        {renderSelect("10. Patient Awareness of Movements", "patientAwareness")}
        {renderSelect("11. Emotional Distress Due to Movements", "emotionalDistress")}
        {renderSelect("12. Global Rating of Abnormal Movements", "globalRating")}

        <div className="form-group">
          <label>13. Other Issues (Optional)</label>
          <textarea
            name="otherIssues"
            value={survey.otherIssues}
            onChange={handleChange}
            placeholder="Enter any additional movement-related concerns..."
            rows="3"
          />   
        </div>

        <button type="submit">Submit Survey</button>
      </form>
    </div>
  );
};

export default SurveyForm;
