import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CaseAnalysis.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CaseAnalysis = () => {
  const [file, setFile] = useState(null);
  const [biasScore, setBiasScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulating API call to ML model
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Replace this with your actual API endpoint
      const response = await fetch('https://api.example.com/analyze-bias', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze case file');
      }

      const result = await response.json();
      setBiasScore(result.biasScore);
    } catch (err) {
      setError('An error occurred while analyzing the case file.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ['No Bias', 'Low', 'Moderate', 'High', 'Extreme'],
    datasets: [
      {
        label: 'Bias Score',
        data: [0, 25, 50, 75, 100],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 0,
      },
      {
        label: 'Case Score',
        data: biasScore ? [biasScore, biasScore, biasScore, biasScore, biasScore] : [],
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointRadius: 5,
        pointHoverRadius: 8,
        showLine: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Bias Score',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 1) {
              return `Bias Score: ${context.parsed.y}`;
            }
            return null;
          },
        },
      },
    },
  };

  return (
    <div className="card case-analysis">
      <h2>Case Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caseFile">Upload Case File:</label>
          <input
            type="file"
            id="caseFile"
            className="input"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Case'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {biasScore !== null && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <p>Bias Score: {biasScore}</p>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseAnalysis;