import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <h3>{course.name}</h3>
        <span className="teacher-name">Öğretmen: {course.teacherName}</span>
      </div>
      <div className="course-body">
        <p className="course-description">{course.description}</p>
        
        <div className="course-progress">
          <div className="progress-label">
            <span>İlerleme</span>
            <span>{course.completionPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="course-footer">
        <Link to={`/courses/${course.id}`} className="view-details-btn">
          Detayları Görüntüle
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;