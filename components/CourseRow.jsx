import React from 'react';
import { GRADES } from '../utils/gradeMap';

const CourseRow = ({ course, onUpdate, onRemove }) => {
  return (
    <tr className="course-row">
      <td>
        <input
          type="text"
          className="input-text"
          value={course.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Course title"
        />
      </td>
      <td>
        <input
          type="number"
          className="input-units"
          min="1"
          max="6"
          value={course.units}
          onChange={(e) => onUpdate({ units: Number(e.target.value) })}
        />
      </td>
      <td>
        <select
          className="input-select"
          value={course.grade}
          onChange={(e) => onUpdate({ grade: e.target.value })}
        >
          {GRADES.map((g) => (
            <option key={g.grade} value={g.grade}>
              {g.grade}
            </option>
          ))}
        </select>
      </td>
      <td className="numeric">
        {(Number(course.units) || 0) * (GRADES.find((g) => g.grade === course.grade)?.points ?? 0)}
      </td>
      <td>
        <button
          className="btn-remove"
          onClick={onRemove}
          title="Remove course"
          aria-label={`Remove ${course.name}`}
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

export default CourseRow;