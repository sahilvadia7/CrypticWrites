// src/pages/Project.js
import React from 'react';
import './AboutProject.css';

const Project = () => {
  const timelineEvents = [
    { date: 'Jan 2024', event: 'Conceptualized Project Idea' },
    { date: 'Feb 2024', event: 'Developed Initial Prototype' },
    { date: 'Mar 2024', event: 'Backend Setup & Infrastructure' },
    { date: 'Apr 2024', event: 'Frontend Development in React' },
    { date: 'May 2024', event: 'Testing & Bug Fixing' },
    { date: 'Jun 2024', event: 'Beta Release' },
    { date: 'Jul 2024', event: 'Official Launch' },
  ];

  return (
    <div className="project-container">
      <h1>About the Project</h1>
      <p className="project-description">
        CrypticWrites is a decentralized blogging platform focused on user privacy and content ownership. It's built using Java Spring Boot and React, leveraging blockchain technology to provide secure, scalable, and modern solutions for content management.
      </p>

      <h2>Project Timeline</h2>
      <div className="minimal-timeline">
        {timelineEvents.map((event, index) => (
          <div key={index} className="minimal-timeline-item">
            <div className="minimal-timeline-date">{event.date}</div>
            <div className="minimal-timeline-content">{event.event}</div>
          </div>
        ))}
      </div>

      <h2>Contribute to Our Project</h2>
      <p>
        We invite all developers to contribute to CrypticWrites and help us improve the platform. Whether you're a front-end or back-end developer, there's something for everyone. Feel free to check out the repository and submit pull requests on GitHub.
      </p>
      <a href="https://github.com/sahilvadia7/CrypticWrites" target="_blank" className="github-link">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="github-logo" />
        Visit our GitHub Repository
      </a>
    </div>
  );
};

export default Project;
