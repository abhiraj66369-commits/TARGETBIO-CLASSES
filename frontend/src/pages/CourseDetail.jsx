import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/courseDetail.css";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/courses`)
      .then(res => res.json())
      .then(data => {
        const c = data.find(x => String(x.id) === id);
        setCourse(c);
      });
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail-page">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p className="price">Price: {course.price}</p>

      <button
        className="view-btn"
        onClick={() => navigate(`/course/${id}/content`)}
      >
        📚 View Course Content
      </button>
    </div>
  );
}

export default CourseDetail;
