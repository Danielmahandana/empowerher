import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import CaseAnalysis from './components/CaseAnalysis';
import EvidenceUpload from './components/EvidenceUpload';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/case-analysis" element={<CaseAnalysis />} />
          <Route path="/evidence-upload" element={<EvidenceUpload />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;