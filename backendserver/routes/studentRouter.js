import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controller/studentcontroller.js';

const studentRouter = express.Router();

studentRouter.get('/getstudents', getStudents);
studentRouter.post('/addstudent', createStudent);
studentRouter.put('/updatestudent/:id', updateStudent);
studentRouter.delete('/deletestudent/:id', deleteStudent);

export default studentRouter;