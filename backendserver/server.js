import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './config/dbconnect.js';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import studentRouter from './routes/studentRouter.js';
import subjectRouter from './routes/subjectRouter.js';
import setupRouter from './routes/setupRouter.js';

const swaggerDoc = JSON.parse(readFileSync(new URL('./swagger.json', import.meta.url)));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/students", studentRouter); // Note: changed from /api/student to /api/students to match frontend
app.use("/images", express.static('uploads'));
app.use("/api/subjects", subjectRouter);
app.use("/api/setup", setupRouter);

app.listen(port, () => console.log(`Server running on port:${port}`));
