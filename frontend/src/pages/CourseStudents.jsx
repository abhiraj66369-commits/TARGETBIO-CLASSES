import { useEffect, useState } from "react";
import "../styles/courseStudents.css";

function CourseStudents() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teacher/course-students`)
      .then(r => r.json())
      .then(setCourses);
  }, []);

  return (
    <div className="course-students-page">

      <h2>🎓 Course-wise Students</h2>

      {courses.map(course => (
        <div key={course.courseId} className="course-block">

          <div className="course-header">
            <h3>{course.title}</h3>
            <span>{course.totalStudents} Students</span>
          </div>

          {course.totalStudents === 0 ? (
            <p className="empty">No students enrolled</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map((s, i) => (
                  <tr key={s.id}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      ))}
    </div>
  );
}

export default CourseStudents;
