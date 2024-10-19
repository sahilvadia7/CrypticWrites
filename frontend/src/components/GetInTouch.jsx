import React, { useState } from 'react';
import './GetInTouch.css'; // Adjust the path if necessary

const GetInTouch = () => {
  const [genToken, setGenToken] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [tokenToCheck, setTokenToCheck] = useState('');

  // Function to generate a new token
  const generateToken = async () => {
    const rand = () => Math.random().toString(36).substr(2);
    const token = rand() + rand();
    setGenToken(token);

    // Send the generated token to the backend to save it with status 'pending'
    try {
      await fetch('http://localhost:8080/api/addToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, status: 'pending' }), // Sending token with default status
      });
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const openEmail = () => {
    if (!genToken) {
      generateToken();
    }
    const mailto = `mailto:admin@crypticwrites.com?subject=Application%20to%20Become%20a%20Creator&body=Dear%20CrypticWrites%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20joining%20your%20platform%20as%20a%20creator.%20Below%20are%20my%20details:%0D%0A%0D%0A-%20Full%20Name:%0D%0A-%20Resume%20(Linked%20or%20Attached):%0D%0A-%20Work%20Experience%20Summary:%0D%0A-%20Social%20Media%20Profiles%20(LinkedIn,%20Twitter,%20etc.):%0D%0A%0D%0AThank%20you%20for%20considering%20my%20application.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]%0D%0A%0D%0AToken:%20${genToken}`;
    window.location.href = mailto;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(genToken)
      .then(() => {
        setCopySuccess('Token copied to clipboard!');
      })
      .catch((err) => {
        setCopySuccess('Failed to copy token');
        console.error('Error copying text: ', err);
      });
  };

  const checkTokenStatus = async () => {
    try {
      const response = await fetch('/api/getTokenByString', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenToCheck }),
      });

      const data = await response.json();
      if (data.status === 'accepted') {
        window.location.href = '/register';
      } else {
        alert('Your token is still pending or invalid.');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Become a Creator at CrypticWrites</h2>
        
        <p className="description">
          We're always looking for passionate creators to share their knowledge and insights. If you're
          interested in joining our team, follow the steps below to apply.
        </p>

        <h3 className="subtitle">Application Requirements</h3>
        <ul className="list">
          <li className="listItem">
            <span className="label">Resume:</span>
            <span>Attach your resume or provide a link (e.g., LinkedIn).</span>
          </li>
          <li className="listItem">
            <span className="label">Work Experience:</span>
            <span>A brief summary of your content creation or relevant experience.</span>
          </li>
          <li className="listItem">
            <span className="label">Social Media Profiles:</span>
            <span>Include links to professional profiles (LinkedIn, Twitter, etc.).</span>
          </li>
        </ul>

        <p className="description">
          Once you have your details ready, click the button below to send your application directly to our team.
        </p>

        <div className="buttonContainer">
          <button onClick={openEmail} className="primaryButton">
            Apply Now
          </button>
        </div>

        {genToken && (
          <div className="tokenSection">
            <p>Generated Token: {genToken}</p>
            <button onClick={copyToClipboard} className="copyButton">
              Copy to Clipboard
            </button>
            {copySuccess && <p className="successMessage">{copySuccess}</p>}
          </div>
        )}

        <div className="tokenCheckSection">
          <h3 className="subtitle">Check Your Token</h3>
          <div className="inputGroup">
            <input
              type="text"
              value={tokenToCheck}
              onChange={(e) => setTokenToCheck(e.target.value)}
              placeholder="Enter token to check"
              className="input"
            />
            <button onClick={checkTokenStatus} className="checkButton">
              Check Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
