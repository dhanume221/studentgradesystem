import React, { useState } from 'react';
import { useStudents } from './hooks';
import './App.css';

const StudentView = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const {
    students,
    refetch,
    updateStudent,
    deleteStudent,
  } = useStudents();

  // inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ grade: '' });

  const handleSearch = () => {
    refetch(search, filter);
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setEditForm({ grade: student.grade });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ grade: '' });
  };

  const saveEdit = async (student) => {
    // send only fields backend needs – here we change only grade
    await updateStudent(student._id, {
      studentName: student.studentName,
      subjectName: student.subjectName,
      grade: Number(editForm.grade),
      remarks: student.remarks,
    });
    setEditingId(null);
    refetch(search, filter);
  };

  return (
    <section className="view-section">
      <h2>Search Student Grade</h2>

      {/* Search and Filter */}
      <div className="controls">
        <label className="control-label">Student Name:</label>
        <div className="search-box">
          <input
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <label className="control-label">Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All" className="opt-all">All Students</option>
          <option value="PASS" className="opt-pass">Pass Students Only</option>
          <option value="FAIL" className="opt-fail">Fail Students Only</option>
        </select>

        <button onClick={handleSearch} className="search-btn">Get Data</button>
      </div>

      <div className="table-wrapper">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Grade(%)</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const isEditing = editingId === student._id;

              return (
                <tr key={student._id}>
                  <td>{student.studentName}</td>
                  <td>{student.subjectName}</td>

                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        className="edit-input"
                        value={editForm.grade}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            grade: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      student.grade
                    )}
                  </td>

                  <td className={`remarks-${student.remarks.toLowerCase()}`}>
                    {student.remarks}
                  </td>

                  <td>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(student)}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(student)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentView;
