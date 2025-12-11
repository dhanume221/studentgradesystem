import Subject from '../models/Subject.js';

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getSubjects };
