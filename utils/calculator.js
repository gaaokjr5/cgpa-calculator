import { getGradePoints } from './gradeMap';

// GPA for a single semester's list of courses
export const calculateGPA = (courses) => {
    if (!courses || courses.length === 0) return { gpa: 0, totalUnits: 0, totalPoints: 0 };

    let totalUnits = 0;
    let totalPoints = 0;

    for (const c of courses) {
        const units = Number(c.units) || 0;
        if (units <= 0) continue;
        totalUnits += units;
        totalPoints += getGradePoints(c.grade) * units;
    }

    const gpa = totalUnits > 0 ? totalPoints / totalUnits : 0;
    return { gpa, totalUnits, totalPoints };
};

// CGPA across all semesters
export const calculateCGPA = (semesters) => {
    let totalUnits = 0;
    let totalPoints = 0;

    for (const sem of semesters) {
        const { totalUnits: u, totalPoints: p } = calculateGPA(sem.courses);
        totalUnits += u;
        totalPoints += p;
    }

    const cgpa = totalUnits > 0 ? totalPoints / totalUnits : 0;
    return { cgpa, totalUnits, totalPoints };
};

// NUC degree classification
export const classifyCGPA = (cgpa) => {
    if (cgpa >= 4.5) return 'First Class';
    if (cgpa >= 3.5) return 'Second Class Upper (2:1)';
    if (cgpa >= 2.4) return 'Second Class Lower (2:2)';
    if (cgpa >= 1.5) return 'Third Class';
    if (cgpa >= 1.0) return 'Pass';
    return 'Fail';
};