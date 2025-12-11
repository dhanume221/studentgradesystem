import e from 'express';
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentKey: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  subjectKey: { type: String, required: true },
  grade: { type: Number, required: true, min: 0, max: 100 },
  remarks: { type: String, required: true }
});

const Student = mongoose.model('mst_student', studentSchema);
export default Student;
