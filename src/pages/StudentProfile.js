import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Spin, Alert, Button, Form, Input, Card} from 'antd';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const { studentId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudent(response.data);
        setEditedStudent(response.data);
        const coursesResponse = await axios.get(`/api/students/${studentId}/courses`);
        setCourses(coursesResponse.data);
      } catch (err) {
        setError('Öğrenci bilgileri yüklenirken bir hata oluştu.');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [studentId]);

  const handleEditChange = (changedValues) => {
    setEditedStudent(prev => ({ ...prev, ...changedValues }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, editedStudent);
      setStudent(editedStudent);
      setIsEditing(false);
      alert('Öğrenci bilgileri başarıyla güncellendi.');
    } catch (err) {
      setError('Bilgiler güncellenirken bir hata oluştu.');
      console.error('Error updating student profile:', err);
    }
  };

  const isTeacher = currentUser?.userType === 'teacher';

  if (loading) return <Spin tip="Yükleniyor..." style={{ width: '100%', marginTop: 48 }} />;
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 24 }} />;
  if (!student) return <Alert message="Öğrenci bulunamadı." type="error" showIcon style={{ margin: 24 }} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Öğrenci Profili</h1>
        {isTeacher && (
          <Button type={isEditing ? 'default' : 'primary'} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'İptal' : 'Düzenle'}
          </Button>
        )}
      </div>
      {isEditing ? (
        <Card>
          <Form layout="vertical" initialValues={editedStudent} onValuesChange={(_, allValues) => handleEditChange(allValues)} onFinish={handleSubmit}>
            <Form.Item label="Ad" name="firstName" rules={[{ required: true, message: 'Ad zorunlu' }]}> <Input /> </Form.Item>
            <Form.Item label="Soyad" name="lastName" rules={[{ required: true, message: 'Soyad zorunlu' }]}> <Input /> </Form.Item>
            <Form.Item label="Sınıf" name="class" rules={[{ required: true, message: 'Sınıf zorunlu' }]}> <Input /> </Form.Item>
            <Form.Item label="Öğretmen Notları" name="notes"> <Input.TextArea rows={4} /> </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Kaydet</Button>
              <Button onClick={() => setIsEditing(false)}>İptal</Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <>
          <Card title="Kişisel Bilgiler">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><strong>Ad Soyad:</strong> {student.firstName} {student.lastName}</div>
              <div><strong>Öğrenci No:</strong> {student.studentId}</div>
              <div><strong>Sınıf:</strong> {student.class}</div>
              {currentUser?.userType !== 'student' && (
                <div><strong>E-posta:</strong> {student.email}</div>
              )}
            </div>
          </Card>
          <Card title="Aldığı Dersler" style={{ marginTop: 24 }}>
            {courses.length === 0 ? (
              <p>Kayıtlı ders bulunamadı.</p>
            ) : (
              <div>
                {courses.map(course => (
                  <div key={course.id} style={{ marginBottom: 24, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{course.name}</h3>
                      <span>Öğretmen: {course.teacherName}</span>
                    </div>
                    <p>{course.description}</p>
                    <div style={{ margin: '8px 0' }}>
                      <span>İlerleme: {course.completionPercentage}%</span>
                      <div style={{ background: '#f0f0f0', borderRadius: 4, height: 8, marginTop: 4 }}>
                        <div style={{ width: `${course.completionPercentage}%`, background: '#1890ff', height: 8, borderRadius: 4 }}></div>
                      </div>
                    </div>
                    <div>
                      <h4>Test Sonuçları</h4>
                      {course.tests.length === 0 ? (
                        <p>Henüz test sonucu bulunmamaktadır.</p>
                      ) : (
                        <table style={{ width: '100%', marginTop: 8 }}>
                          <thead>
                            <tr>
                              <th>Test Adı</th>
                              <th>Tarih</th>
                              <th>Puan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.tests.map(test => (
                              <tr key={test.id}>
                                <td>{test.name}</td>
                                <td>{new Date(test.date).toLocaleDateString('tr-TR')}</td>
                                <td>{test.score}/{test.totalScore}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          {isTeacher && (
            <Card title="Öğretmen Notları" style={{ marginTop: 24 }}>
              {student.notes ? (
                <p>{student.notes}</p>
              ) : (
                <p>Not bulunmamaktadır. Düzenle butonuna tıklayarak not ekleyebilirsiniz.</p>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default StudentProfile;