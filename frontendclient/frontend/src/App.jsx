import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentView from './StudentView';
import './App.css';

function App() {
  return (
    <div className="app">

      <header>
        <h2 className="app-header">Student Grade Management</h2>
      </header>
      <main>
        <StudentForm />
        <StudentView />
      </main>
    </div>
  );
}

export default App;
