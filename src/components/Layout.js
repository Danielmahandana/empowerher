import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="container navbar-content">
          <Link to="/" className="navbar-brand">JustiGuard AI</Link>
          <div className="navbar-links">
            <Link to="/dashboard">Chatbot</Link>
            <Link to="/case-analysis">Case Analysis</Link>
            <Link to="/evidence-upload">Evidence Upload</Link>
          </div>
        </div>
      </nav>

      <main className="container main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          © 2024 JustiGuard AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;