import { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

export const useStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async (search = '', filter = 'All') => {
    try {
      const params = new URLSearchParams({ search, remarks: filter });
      const response = await fetch(`${API_BASE_URL}/api/students/getstudents?${params}`);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Fetch error:", error);
      // Optional: alert or set error state
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/addstudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'DUPLICATE') {
          alert("Student already exists");
        } else {
          alert("Error creating student: " + (data.error || response.status));
        }
        return;
      }

      setStudents(prev => [...prev, data]);
    } catch (error) {
      alert("Network or Server Error: " + error.message);
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/updatestudent/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert('Update failed: ' + (errorData.error || response.status));
        return;
      }

      const updatedStudent = await response.json();
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s))
      );
    } catch (error) {
      alert('Update error: ' + error.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/deletestudent/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert('Delete failed: ' + (errorData.error || response.status));
        return;
      }

      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      alert('Delete error: ' + error.message);
    }
  };
  return { students, createStudent, updateStudent, deleteStudent, refetch: fetchStudents };
};
