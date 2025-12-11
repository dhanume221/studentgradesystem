import { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

export const useStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async (search = '', filter = 'All') => {
    const params = new URLSearchParams({ search, remarks: filter });
    const response = await fetch(`${API_BASE_URL}/api/students?${params}`);
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });

    const newStudent = await response.json();

    if (!response.ok) {
      if (newStudent.error === 'DUPLICATE') {
        alert("Student already exists");
      } else {
        alert("Error creating student: " + (newStudent.error || 'Unknown error'));
      }
      return;
    }

    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    const updatedStudent = await response.json();
    console.log('PUT status', response.status, 'body', updatedStudent); // debug

    if (!response.ok) {
      alert(
        'Update failed: ' + (updatedStudent.message || response.status)
      );
      return;
    }

    setStudents((prev) =>
      prev.map((s) => (s._id === id ? updatedStudent : s))
    );
  };

  const deleteStudent = async (id) => {
    await fetch(`${API_BASE_URL}/api/students/${id}`, { method: 'DELETE' });
    setStudents(prev => prev.filter(s => s._id !== id));
  };
  return { students, createStudent, updateStudent, deleteStudent, refetch: fetchStudents };
};
