import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientForm from "./components/AIMS/PatientForm";
import SurveyForm from "./components/AIMS/SurveyForm";
import SurveyResult from "./components/AIMS/SurveyResult";
import SearchForm from "./components/AIMS/SearchForm";
import SearchResults from "./components/AIMS/SearchResults";


function App() {
  return (
    <Routes>
      <Route path="/" element={<PatientForm />} />
      <Route path="/survey" element={<SurveyForm />} />
      <Route path="/result" element={<SurveyResult />} />
      <Route path="/search" element={<SearchForm />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
