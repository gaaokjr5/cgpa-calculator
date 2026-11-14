import React, { useState } from 'react';
import { GRADES } from '../utils/gradeMap';

const AddCourseForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [units, setUnits] = useState(3);
  const [grade, setGrade] = useState('A');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || Number(units) <= 0) return;
    onAdd({ name, units: Number(units), grade });
    setName('');
    setUnits(3);
    setGrade('A');
  };

  return (
    <form className="add-course-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course name (e.g. CSC 101)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-text"
      />
      <input
        type="number"
        min="1"
        max="6"
        value={units}
        onChange={(e) => setUnits(Number(e.target.value))}
        className="input-units"
        placeholder="Units"
      />
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="input-select"
      >
        {GRADES.map((g) => (
          <option key={g.grade} value={g.grade}>
            {g.grade} ({g.points})
          </option>
        ))}
      </select>
      <button type="submit" className="btn-add">
        + Add Course
      </button>
    </form>
  );
};

export default AddCourseForm;