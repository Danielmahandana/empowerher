import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebase';
import './EvidenceUpload.css';

const EvidenceUpload = () => {
  const [caseId, setCaseId] = useState('');
  const [evidenceType, setEvidenceType] = useState('Document');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Initialize storage
  const storage = getStorage(app);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!caseId || !file) {
      setMessage('Please provide a case ID and select a file.');
      return;
    }

    const storageRef = ref(storage, `evidence/${caseId}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setMessage(`File uploaded successfully! URL: ${url}`);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="card evidence-upload">
      <h2>Evidence Upload</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="caseId">Case ID:</label>
          <input
            type="text"
            id="caseId"
            className="input"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="evidenceType">Evidence Type:</label>
          <select
            id="evidenceType"
            className="input"
            value={evidenceType}
            onChange={(e) => setEvidenceType(e.target.value)}
          >
            <option>Document</option>
            <option>Image</option>
            <option>Video</option>
            <option>Audio</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            className="input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Upload Evidence
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default EvidenceUpload;
