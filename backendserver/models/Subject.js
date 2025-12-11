import mongoose from 'mongoose';


const subjectSchema = new mongoose.Schema({

  subjectKey: { type: String, required: true, unique: true },
  subjectName: { type: String, required: true }
});

const Subject = mongoose.model('mst_subject', subjectSchema);
export default Subject;