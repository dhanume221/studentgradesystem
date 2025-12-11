import Student from '../models/Student.js';
import Subject from '../models/Subject.js';

const generateRemarks = (grade) => grade >= 75 ? 'PASS' : 'FAIL';

const getStudents = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.studentName = { $regex: search, $options: 'i' };
        }
        if (req.query.remarks && req.query.remarks !== 'All') {
            query.remarks = req.query.remarks;
        }

        const students = await Student.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'mst_subjects',
                    localField: 'subjectKey',
                    foreignField: 'subjectKey',
                    as: 'subjectInfo'
                }
            },
            {
                $unwind: {
                    path: '$subjectInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    studentKey: 1,
                    studentName: 1,
                    subjectKey: 1,
                    grade: 1,
                    remarks: 1,
                    subjectName: '$subjectInfo.subjectName'
                }
            }
        ]);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const { studentKey, studentName, subjectKey, grade } = req.body;
        const remarks = generateRemarks(grade);
        const subkey = subjectKey.toUpperCase();
        const checking = await Student.findOne({ studentKey });
        if (checking) {
            alert("Student already exists");
            return res.status(400).json({ error: 'Student already exists' });
        }
        const subcheck = await Subject.findOne({ subjectKey: subkey });
        if (!subcheck) {
            alert("Subject does not exist");
            return res.status(400).json({ error: 'Subject does not exist' });
        }
        const student = new Student({
            studentKey,
            studentName,
            subjectKey: subkey,
            grade,
            remarks
        });

        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { grade } = req.body;
        const remarks = generateRemarks(grade);
        const student = await Student.findOneAndUpdate(
            { studentKey: req.params.id },
            { grade, remarks },
            { new: true }
        );
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        await Student.findOneAndDelete({ studentKey: req.params.id });
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getStudents, createStudent, updateStudent, deleteStudent };
