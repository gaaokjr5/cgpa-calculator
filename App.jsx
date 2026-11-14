import React, { useMemo } from 'react';
import { useSemesters } from './hooks/useSemesters';
import { calculateCGPA, calculateGPA } from './utils/calculator';
import SemesterSection from './components/SemesterSection';
import ResultCard from './components/ResultCard';
import GradeScale from './components/GradeScale';

const App = () => {
  const {
    semesters,
    addCourse,
    removeCourse,
    updateCourse,
    renameSemester,
    reset,
  } = useSemesters();

  // Recompute derived state on every state change (memoized for clarity)
  const { cgpa, totalUnits, totalPoints } = useMemo(
    () => calculateCGPA(semesters),
    [semesters]
  );

  const semesterBreakdown = useMemo(
    () =>
      semesters.map((s) => ({
        id: s.id,
        name: s.name,
        gpa: calculateGPA(s.courses).gpa,
      })),
    [semesters]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>NUC CGPA Calculator</h1>
        <p className="subtitle">
          5.0 scale • Add, edit, or remove courses at any time
        </p>
      </header>

      <main className="app-main">
        <div className="semesters-column">
          {semesters.map((sem) => (
            <SemesterSection
              key={sem.id}
              semester={sem}
              onAddCourse={addCourse}
              onRemoveCourse={removeCourse}
              onUpdateCourse={updateCourse}
              onRename={(name) => renameSemester(sem.id, name)}
            />
          ))}
          <button className="btn-reset" onClick={reset}>
            ↺ Reset All
          </button>
        </div>

        <aside className="sidebar">
          <ResultCard
            cgpa={cgpa}
            totalUnits={totalUnits}
            totalPoints={totalPoints}
            semesterBreakdown={semesterBreakdown}
          />
          <GradeScale />
        </aside>
      </main>
    </div>
  );
};

export default App;