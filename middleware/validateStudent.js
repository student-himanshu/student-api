function validateStudent(req, res, next) {

    const { name, age } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!age) {
        return res.status(400).json({
            message: "Age is required"
        });
    }

    if (name.length < 3) {
        return res.status(400).json({
            message: "Name must contain at least 3 characters"
        });
    }

    if (age <= 0) {
        return res.status(400).json({
            message: "Age must be greater than 0"
        });
    }

    next();//Ye Express ko bolta hai "Validation complete ho gayi. Ab next function chalao."

}

module.exports = validateStudent;