// src/pages/About.js
import React from "react";
import "./About.css";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const About = () => {
  const developers = [
    {
      name: "Ankit Yadav",
      logo: "https://via.placeholder.com/100?text=Ankit",
      description:
        "Backend developer with expertise in Node.js, Express, and database management.",
      linkedin: "https://linkedin.com/in/ankit-yadav",
      twitter: "https://twitter.com/ankit_yadav",
      github: "https://github.com/ankit-yadav",
    },
    {
      name: "Nikhil Rathod",
      logo: "https://via.placeholder.com/100?text=Nikhil",
      description:
        "Experienced in Java Spring Boot and React, creating secure, scalable applications with modern web technologies.",
      linkedin: "https://linkedin.com/in/nikhil-rathod",
      twitter: "https://twitter.com/nikhil_rathod",
      github: "https://github.com/nikhil-rathod",
    },
    {
      name: "Sahil Vadia",
      logo: "https://via.placeholder.com/100?text=Sahil",
      description:
        "Full Stack Developer with a passion for building scalable applications using Java, Spring Boot, and React.",
      linkedin: "https://www.linkedin.com/in/sahil-vadia-928755258/",
      twitter: "https://x.com/SahilVadia",
      github: "https://github.com/sahilvadia7",
    },
  ];

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="developer-cards">
        {developers.map((developer, index) => (
          <div className="developer-card" key={index}>
            <img
              src={developer.logo}
              alt={developer.name}
              className="developer-logo"
            />
            <h2>{developer.name}</h2>
            <p>{developer.description}</p>
            <div className="social-icons">
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="social-icon linkedin" />
              </a>
              <a
                href={developer.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="social-icon twitter" />
              </a>
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="social-icon github" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
