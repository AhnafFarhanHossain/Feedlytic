"use client";
// app/reports/page.js

import { useState } from "react";
import axios from "axios";

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const feedbackData = [
    { user: "John", feedback: "Great service, but slow response time" },
    { user: "Emma", feedback: "Love the UI, but feature X is missing" },
  ];

  const analyticsData = {
    totalFeedbacks: 120,
    positiveFeedback: 80,
    negativeFeedback: 40,
  };

  async function generateReport() {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("/api/generateReport", {
        feedbackData,
        analyticsData,
      });
      setReport(response.data.report);
    } catch (error) {
      console.error("Failed to generate report", error);
      setError(
        error.response ? error.response.data.error : "Failed to generate report"
      );
    }
    setLoading(false);
  }

  return (
    <div>
      <h1>AI Generated Report</h1>
      <button onClick={generateReport} disabled={loading}>
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error */}
      {report && (
        <div>
          <h2>Report</h2>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
}
