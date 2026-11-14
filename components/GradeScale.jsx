import React from 'react';
import { GRADES } from '../utils/gradeMap';

const GradeScale = () => (
  <div className="grade-scale">
    <h3>NUC Grade Scale</h3>
    <table>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Score Range</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {GRADES.map((g) => (
          <tr key={g.grade}>
            <td className={`grade-badge grade-${g.grade}`}>{g.grade}</td>
            <td>{g.range}</td>
            <td>{g.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default GradeScale;