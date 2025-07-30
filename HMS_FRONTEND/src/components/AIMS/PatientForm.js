import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    surveyDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/patients", formData);
      const patient = response.data;
      navigate("/survey", { state: { patient } });
    } catch (error) {
      console.error("Error submitting patient form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>AIMS Patient Info</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          required
          min="1"
          max="120"
          value={formData.age}
          onChange={handleChange}
        />

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="surveyDate">Survey Date</label>
        <input
          type="date"
          name="surveyDate"
          required
          value={formData.surveyDate}
          onChange={handleChange}
        />

        <button type="submit">Start Survey</button>
      </form>
    </div>
  );
};

export default PatientForm;
