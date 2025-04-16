import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Alert, Button } from 'antd';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError('Ders detayları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <Spin tip="Yükleniyor..." style={{ width: '100%', marginTop: 48 }} />;
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 24 }} />;
  if (!course) return <Alert message="Ders bulunamadı." type="error" showIcon style={{ margin: 24 }} />;

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h1>{course.title}</h1>
      <div style={{ marginBottom: 24 }}>
        <p><strong>Eğitmen:</strong> {course.instructor}</p>
        <p><strong>Süre:</strong> {course.duration}</p>
        <p><strong>Seviye:</strong> {course.level}</p>
      </div>
      <section style={{ marginBottom: 24 }}>
        <h2>Ders Açıklaması</h2>
        <p>{course.description}</p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2>Müfredat</h2>
        <ul>
          {course.syllabus.map((item, index) => (
            <li key={index} style={{ marginBottom: 12 }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button type="primary">Kursa Katıl</Button>
        <Link to="/courses">
          <Button>Tüm Kurslara Dön</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;