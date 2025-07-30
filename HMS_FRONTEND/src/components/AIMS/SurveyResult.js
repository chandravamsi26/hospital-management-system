import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";

const SurveyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const { patient, survey } = location.state || {};

  useEffect(() => {
    if (!patient || !survey) return;

    const ctx = chartRef.current.getContext("2d");

    const labels = [
      "Facial Muscles", "Lips/Perioral", "Jaw", "Tongue",
      "Upper Extremities", "Lower Extremities", "Neck/Shoulders/Hips",
      "Severity", "Incapacitation", "Awareness", "Distress", "Global"
    ];

    const dataValues = [
      survey.facialMuscles,
      survey.lipsPerioral,
      survey.jaw,
      survey.tongue,
      survey.upperExtremities,
      survey.lowerExtremities,
      survey.neckShouldersHips,
      survey.severityOfMovements,
      survey.incapacitationDueToMovements,
      survey.patientAwareness,
      survey.emotionalDistress,
      survey.globalRating
    ];

    const pointColors = dataValues.map(val => {
      if (val <= 2) return "green";
      else if (val === 3) return "orange";
      else return "darkorange";
    });

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "AIMS Scores",
          data: dataValues,
          borderColor: "#007bff",
          backgroundColor: "rgba(0,123,255,0.1)",
          pointBackgroundColor: pointColors,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: { stepSize: 1 }
          }
        }
      }
    });

    chartInstanceRef.current = chart;
    return () => chart.destroy();
  }, [patient, survey]);

  const handleDownload = async () => {
  try {
    const canvas = chartRef.current;
    const chartImage = canvas.toDataURL("image/png"); // base64 string

    const response = await axios.post("http://localhost:8080/api/download-pdf", {
      patient,
      survey,
      chartImage // include chart image
    }, {
      responseType: "blob"
    });

    // Trigger file download
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${patient.firstName}_${patient.lastName}_Survey.pdf`;
    link.click();
  } catch (error) {
    console.error("PDF download failed:", error);
  }
};


  if (!patient || !survey) {
    return <p className="error-message">Missing data. Please restart the survey.</p>;
  }

  return (
    <div className="container">
      <h2>Survey Result</h2>

      <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Survey Date:</strong> {patient.surveyDate}</p>

      <canvas ref={chartRef} width="700" height="300"></canvas>

      <div className="btn-group">
        <button className="download-btn" onClick={handleDownload}>Download PDF</button>
        <button className="new-btn" onClick={() => navigate("/")}>Take Another Survey</button>
        <button className="search-btn" onClick={() => navigate("/search")}>Search Previous Surveys</button>
      </div>
    </div>
  );
};

export default SurveyResult;
