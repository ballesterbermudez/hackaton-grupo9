const { ValidationError } = require('sequelize');
const persistence = require('../persistence/persistence');

const usersController = {
    createUser: async (req, res) => {
        try {
            const body = req.body;
            if (!(body.email && body.pass && body.nombre && body.apellido))
                return res.status(404).json({
                    msg: 'Not Found',
                });
            const user = await persistence.insert('Usuarios', body);
            if (user) {
                res.status(200).json({
                    msg: 'User created successfully',
                });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                const errorArray = [];
                error.errors.forEach((el, i) => {
                    errorArray[i] = el.message;
                });
                res.status(401).json(errorArray);
            } else {
                res.status(500).json({
                    msg: 'Server Error',
                });
            }
        }
    },
    editUser: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const body = req.body;
            const user = persistence.updateData('Usuarios', id, body);
            if (!user)
                return res.status(404).json({
                    msg: 'Not Found',
                });
            res.status(200).json({
                msg: 'User edited successfully',
            });
        } catch {
            if (error instanceof ValidationError) {
                const errorArray = [];
                error.errors.forEach((el, i) => {
                    errorArray[i] = el.message;
                });
                res.status(401).json(errorArray);
            } else {
                res.status(500).json({
                    msg: 'Server Error',
                });
            }
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const user = persistence.searchById('Usuarios', id);
            if (!user)
                return res.status(404).json({
                    msg: 'Not found',
                });
            persistence.delete('Usuarios', id);
            return res.status(200).json({
                msg: 'User deleted successfully',
            });
        } catch {
            res.status(500).json({
                msg: 'Server Error',
            });
        }
    },
};

module.exports = usersController;
