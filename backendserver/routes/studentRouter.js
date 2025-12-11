import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controller/studentcontroller.js';

const studentRouter = express.Router();

studentRouter.get('/', getStudents);
studentRouter.post('/', createStudent);
studentRouter.put('/:id', updateStudent);
studentRouter.delete('/:id', deleteStudent);

export default studentRouter;