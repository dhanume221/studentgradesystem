import express from 'express';
import { setupDatabase } from '../controller/setupcontroller.js';

const setupRouter = express.Router();

setupRouter.post('/', setupDatabase);

export default setupRouter;
