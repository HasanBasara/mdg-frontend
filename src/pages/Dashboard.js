import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import CourseCard from '../components/CourseCard';
import { Spin, Alert, Button } from 'antd';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    courses: [],
    upcomingTests: [],
    students: [],
    announcements: []
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let endpoint = '/api/dashboard';
        if (currentUser?.userType) {
          endpoint = `/api/dashboard/${currentUser.userType}`;
        }
        const response = await axios.get(endpoint);
        setDashboardData(response.data);
      } catch (err) {
        setError('Dashboard verileri yüklenirken bir hata oluştu.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [currentUser]);

  if (loading) {
    return <Spin tip="Yükleniyor..." style={{ width: '100%', marginTop: 48 }} />;
  }
  if (error) {
    return <Alert message={error} type="error" showIcon style={{ margin: 24 }} />;
  }

  return (
    <div>
      <h1>Hoş Geldiniz, {currentUser?.displayName || 'Kullanıcı'}</h1>
      <section style={{ marginBottom: 32 }}>
        <h2>Derslerim</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {dashboardData.courses.length > 0 ? (
            dashboardData.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>Henüz kaydolduğunuz bir ders bulunmamaktadır.</p>
          )}
        </div>
        <Link to="/courses">
          <Button type="link">Tüm dersleri görüntüle</Button>
        </Link>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>Yaklaşan Sınavlar</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {dashboardData.upcomingTests.length > 0 ? (
            dashboardData.upcomingTests.map(test => (
              <Card key={test.id}>
                <h3>{test.title}</h3>
                <p><strong>Tarih:</strong> {new Date(test.date).toLocaleDateString()}</p>
                <p><strong>Ders:</strong> {test.courseName}</p>
                <Link to={`/tests/${test.id}`}>Detaylar</Link>
              </Card>
            ))
          ) : (
            <p>Yaklaşan sınav bulunmamaktadır.</p>
          )}
        </div>
      </section>
      {currentUser?.userType === 'teacher' && (
        <section style={{ marginBottom: 32 }}>
          <h2>Öğrencilerim</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {dashboardData.students.length > 0 ? (
              dashboardData.students.map(student => (
                <Card key={student.id}>
                  <h3>{student.name}</h3>
                  <p><strong>Email:</strong> {student.email}</p>
                  <Link to={`/students/${student.id}`}>Profili Görüntüle</Link>
                </Card>
              ))
            ) : (
              <p>Henüz öğrenciniz bulunmamaktadır.</p>
            )}
          </div>
          <Link to="/students">
            <Button type="link">Tüm öğrencileri görüntüle</Button>
          </Link>
        </section>
      )}
      <section>
        <h2>Duyurular</h2>
        <div>
          {dashboardData.announcements.length > 0 ? (
            dashboardData.announcements.map(announcement => (
              <Card key={announcement.id} style={{ marginBottom: 16 }}>
                <h3>{announcement.title}</h3>
                <p style={{ color: '#888' }}>{new Date(announcement.date).toLocaleDateString()}</p>
                <p>{announcement.content}</p>
              </Card>
            ))
          ) : (
            <p>Yeni duyuru bulunmamaktadır.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;