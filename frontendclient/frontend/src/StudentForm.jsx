import React, { useState, useEffect } from 'react';
import { useStudents } from './hooks';
import { API_BASE_URL } from './config';
import './App.css';


const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentKey: '',
    studentName: '',
    subjectKey: '',
    grade: ''
  });
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { students, createStudent, updateStudent, deleteStudent } = useStudents();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/subjects`)
      .then(res => res.json())
      .then(setSubjects);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, grade: Number(formData.grade) };

    if (editingId) {
      await updateStudent(editingId, data);
      setEditingId(null);
    } else {
      await createStudent(data);
    }
    setFormData({ studentKey: '', studentName: '', subjectKey: '', grade: '' });
  };

  return (
    <section className="crud-section">
      <h2 className="section-title">Add Grade Details</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          placeholder="Student Key"
          value={formData.studentKey}
          onChange={(e) => setFormData({ ...formData, studentKey: e.target.value })}
          required
          maxLength="7"
          pattern="\d*"
          title="Student Key must be up to 7 digits."
        />
        <input
          placeholder="Student Name"
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          required
          pattern="^[a-zA-Z\s]+$"
          title="Student Name must only contain alphabets."
        />
        <select
          value={formData.subjectKey}
          onChange={(e) => setFormData({ ...formData, subjectKey: e.target.value })}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s._id} value={s.subjectKey}>{s.subjectName}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Grade in percentage (0-100)"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          min="0"
          max="100"
          required
        />
        <button type="submit" style={{ width: '200px', alignContent: 'center', justifyContent: 'center', marginLeft: "320px", marginTop: "20px" }}>{editingId ? 'Update' : 'Add Student'}</button>
      </form>
    </section>
  );
};

export default StudentForm;
