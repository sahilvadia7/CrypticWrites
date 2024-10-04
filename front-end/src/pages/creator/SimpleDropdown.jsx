import React, { useState } from 'react';
import './SimpleDropdown.css'; // Import your CSS file

const SimpleDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState('--');
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = [
    "Algorithms",
    "Data Structures",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems (DBMS)",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Web Development",
    "Mobile App Development",
    "Human-Computer Interaction (HCI)",
    "Distributed Systems",
    "Cloud Computing",
    "Cybersecurity",
    "Cryptography",
    "Computer Graphics",
    "Computer Vision",
    "Natural Language Processing (NLP)",
    "Compiler Design",
    "Theory of Computation",
    "Programming Languages",
    "Object-Oriented Programming (OOP)",
    "Functional Programming",
    "Systems Programming",
    "Network Security",
    "Embedded Systems",
    "Internet of Things (IoT)",
    "Blockchain Technology",
    "Game Development",
    "DevOps",
    "Big Data",
    "Data Mining",
    "Information Retrieval",
    "User Interface Design",
    "Agile Methodologies",
    "Version Control Systems (e.g., Git)",
    "Testing and Quality Assurance",
    "Software Architecture",
    "Concurrency and Parallelism",
    "Graph Theory",
    "Mathematical Foundations of Computer Science",
    "Ethics in Computer Science",
    "Cloud Infrastructure",
    "Artificial Neural Networks",
    "Augmented Reality (AR) and Virtual Reality (VR)",
    "Digital Signal Processing",
    "Web Security",
    "Content Management Systems (CMS)",
    "APIs and Microservices",
    "Hardware Architecture",
    "Quantum Computing",
    "Compiler Optimization",
    "Performance Analysis",
    "Social Networks Analysis",
    "Robotics",
    "Digital Forensics",
    "Technical Writing and Documentation"
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelected(category);
    setIsOpen(false);
    onChange(category); // Call the onChange prop to update the parent component
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selected}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {categories.map((category, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleDropdown;
