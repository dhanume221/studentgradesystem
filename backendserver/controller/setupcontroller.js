import Subject from '../models/Subject.js';

const setupDatabase = async (req, res) => {
    try {

        const count = await Subject.countDocuments();
        if (count === 0) {
            await Subject.insertMany([
                { subjectKey: 'MAT01', subjectName: 'Mathematics' },
                { subjectKey: 'SC02', subjectName: 'Science' },
                { subjectKey: 'ENG03', subjectName: 'English' }
            ]);
            res.json({ message: 'Setup complete: Subjects added.' });
        } else {
            res.json({ message: 'Setup skipped: Subjects already exist.' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { setupDatabase };
