import React from 'react';
import { classifyCGPA } from '../utils/calculator';

const ResultCard = ({ cgpa, totalUnits, totalPoints, semesterBreakdown }) => {
  return (
    <div className="result-card">
      <div className="result-main">
        <div className="result-block">
          <span className="label">CGPA</span>
          <span className="value">{cgpa.toFixed(2)}</span>
          <span className="classification">{classifyCGPA(cgpa)}</span>
        </div>
        <div className="result-stats">
          <div>
            <span className="label">Total Units</span>
            <span className="stat">{totalUnits}</span>
          </div>
          <div>
            <span className="label">Total Points</span>
            <span className="stat">{totalPoints}</span>
          </div>
        </div>
      </div>

      {semesterBreakdown.length > 0 && (
        <div className="semester-breakdown">
          <h4>Semester Breakdown</h4>
          {semesterBreakdown.map((s) => (
            <div key={s.id} className="breakdown-row">
              <span>{s.name}</span>
              <span>{s.gpa.toFixed(2)} GPA</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultCard;