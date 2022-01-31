import { createContext, useState } from "react";
import { CourseEntry } from "../../domain/course-list-entry.entity";

export type CourseListContextType = {
    courses: CourseEntry[],
    addCourse: (course: CourseEntry) => void,
    setCourses: (courses: CourseEntry[]) => void
}

export const CourseListContext = createContext<CourseListContextType>({
    courses: [],
    addCourse: (course: CourseEntry) => { },
    setCourses: (courses: CourseEntry[]) => { }
});

type CourseListContextProviderProps = { children: React.ReactNode }

export default function CourseListContextProvider({ children }: CourseListContextProviderProps) {
    const [courses, setCourses] = useState<CourseEntry[]>([]);

    const addCourse = (course: CourseEntry) => {
        setCourses((_courses) => {
            const newCourses = [..._courses, course];
            return newCourses;
        })
    }

    return <CourseListContext.Provider value={{ courses, addCourse, setCourses }}>
        {children}
    </CourseListContext.Provider>
}