import { useState, useCallback } from 'react';

let idCounter = 1;
const uid = () => `id-${idCounter++}`;

const createEmptySemester = (name = 'First Semester') => ({
    id: uid(),
    name,
    courses: [],
});

export const useSemesters = () => {
    const [semesters, setSemesters] = useState(() => [
        createEmptySemester('First Semester'),
        createEmptySemester('Second Semester'),
    ]);

    const addCourse = useCallback((semesterId, course) => {
        setSemesters((prev) =>
            prev.map((sem) =>
                sem.id === semesterId ?
                {
                    ...sem,
                    courses: [
                        ...sem.courses,
                        {
                            id: uid(),
                            name: course.name.trim() || 'Untitled Course',
                            units: Number(course.units) || 0,
                            grade: course.grade || 'A',
                        },
                    ],
                } :
                sem
            )
        );
    }, []);

    const removeCourse = useCallback((semesterId, courseId) => {
        setSemesters((prev) =>
            prev.map((sem) =>
                sem.id === semesterId ?
                {...sem, courses: sem.courses.filter((c) => c.id !== courseId) } :
                sem
            )
        );
    }, []);

    // Edit is a patch — grade and/or units (and name too)
    const updateCourse = useCallback((semesterId, courseId, patch) => {
        setSemesters((prev) =>
            prev.map((sem) =>
                sem.id === semesterId ?
                {
                    ...sem,
                    courses: sem.courses.map((c) =>
                        c.id === courseId ? {...c, ...patch } : c
                    ),
                } :
                sem
            )
        );
    }, []);

    const renameSemester = useCallback((semesterId, name) => {
        setSemesters((prev) =>
            prev.map((sem) => (sem.id === semesterId ? {...sem, name } : sem))
        );
    }, []);

    const reset = useCallback(() => {
        setSemesters([
            createEmptySemester('First Semester'),
            createEmptySemester('Second Semester'),
        ]);
    }, []);

    return {
        semesters,
        addCourse,
        removeCourse,
        updateCourse,
        renameSemester,
        reset,
    };
};