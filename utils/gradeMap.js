// NUC grade-to-point mapping
export const GRADES = [
    { grade: 'A', points: 5, range: '70 - 100' },
    { grade: 'B', points: 4, range: '60 - 69' },
    { grade: 'C', points: 3, range: '50 - 59' },
    { grade: 'D', points: 2, range: '45 - 49' },
    { grade: 'E', points: 1, range: '40 - 44' },
    { grade: 'F', points: 0, range: '0 - 39' },
];

export const GRADE_POINTS = GRADES.reduce((acc, g) => {
    acc[g.grade] = g.points;
    return acc;
}, {});

export const getGradePoints = (grade) => GRADE_POINTS[grade] ?? 0;