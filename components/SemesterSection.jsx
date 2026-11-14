import React from 'react';
import CourseRow from './CourseRow';
import AddCourseForm from './AddCourseForm';
import { calculateGPA } from '../utils/calculator';

const SemesterSection = ({
  semester,
  onAddCourse,
  onRemoveCourse,
  onUpdateCourse,
  onRename,
}) => {
  const { gpa, totalUnits, totalPoints } = calculateGPA(semester.courses);

  return (
    <section className="semester-section">
      <div className="semester-header">
        <input
          className="semester-title-input"
          value={semester.name}
          onChange={(e) => onRename(e.target.value)}
          aria-label="Semester name"
        />
        <div className="semester-badge">
          GPA: <strong>{gpa.toFixed(2)}</strong>
          <span className="meta">
            {totalUnits} units • {totalPoints} points
          </span>
        </div>
      </div>

      {semester.courses.length > 0 ? (
        <table className="course-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Units</th>
              <th>Grade</th>
              <th>Points</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {semester.courses.map((course) => (
              <CourseRow
                key={course.id}
                course={course}
                onUpdate={(patch) => onUpdateCourse(semester.id, course.id, patch)}
                onRemove={() => onRemoveCourse(semester.id, course.id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-state">No courses yet. Add your first course below.</p>
      )}

      <AddCourseForm onAdd={(course) => onAddCourse(semester.id, course)} />
    </section>
  );
};

export default SemesterSection;