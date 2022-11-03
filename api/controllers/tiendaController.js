const persistence = require('../persistence/persistence');
const { response, request } = require('express');
const { ValidationError } = require('sequelize');

const create = async (req = request, res = response) => {
    try {
        if (!req.body.nombre) {
            return res.status(404).json({
                msg: 'not found - no puede enviar campos vacios'
            })
        }
        //Armo el obj con los datos
        let data = {
            nombre: req.body.nombre
        };
        //Busco tienda por nombre
        const existe = await getTienda(data);
        //Verifico existencia
        if (existe.length != 0) {
            return res.status(400).json({
                msg: 'Ya existe una tienda con ese nombre'
            })
        }
        //Creo nueva tienda 
        const newTienda = await persistence.insert("Tiendas", data);
        
        res.status(200).json({
            msg: 'Tienda ingresada',
            tienda: newTienda
        });
    } catch (error) {
        //Error en los datos que manda el usuario
        if (error instanceof ValidationError) {
            let errorArray = [];
            error.errors.forEach((el, i) => {
                errorArray[i] = el.message;
            });
            res.status(401).json(errorArray);
        } else {
            res.status(500).json({
                msg: 'Server error',
                error: error
            });
        }
    }
}

const readAll = async (req = request, res = response) => {
    try {                
        console.log('hola')
        const tiendas = await persistence.searchAll("Tiendas");
        console.log(tiendas)
        res.status(200).json({
            msg: 'Tienda encontrada',
            tiendas: tiendas
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error
        });
    }
}

const readByName = async (req = request, res = response) => {
    try {
        if (!req.body.nombre) {
            return res.status(404).json({
                msg: 'not found - no puede enviar campos vacios'
            })
        }

        let nombre = { 
            nombre: req.body.nombre
        };
        
        const existe = await getTienda(nombre);

        if (existe.length === 0) {
            return res.status(404).json({
                msg: 'not found'
            })
        } else {
            res.status(200).json({
                msg: 'Tienda encontrada',
                tienda: existe
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error
        });
    }
}

const update = async (req = request, res = response) => {
    try {
        if (!req.body.nombre) {
            return res.status(404).json({
                msg: 'not found - no puede enviar campos vacios'
            })
        }

        const { id } = req.params;
        let data = {
            id: id
        }

        const newData = {
            nombre: req.body.nombre
        }

        const existe = await getTienda(data);

        if (existe.length === 0) {
            return res.status(404).json({
                msg: 'not found'
            });
        }

        await persistence.updateData("Tiendas", id, newData);
        console.log('hola')
        const tienda = await getTienda(newData);

        res.status(200).json({
            msg: 'Tienda modificada',
            tienda: tienda
        });
    } catch (error) {
        //Error en los datos que manda el usuario
        if (error instanceof ValidationError) {
            let errorArray = [];
            error.errors.forEach((el, i) => {
                errorArray[i] = el.message;
            });
            res.status(401).json(errorArray);
        } else {
            res.status(500).json({
                msg: 'Server error',
                error: error
            });
        }
    }
}

const deleteTienda = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const existe = await getTienda({ id: id});

        if (existe.length === 0) {
            return res.status(404).json({
                msg: 'not found'
            })
        }

        await persistence.delete("Tiendas", id);

        res.status(200).json({
            msg: 'Se elimino con exito'
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            let errorArray = [];
            error.errors.forEach((el, i) => {
                errorArray[i] = el.message;
            });
            res.status(401).json(errorArray);
        } else {
            res.status(500).json({
                msg: 'Server error',
                error: error
            });
        }
    }
}

//Se le pasa el obj que va dentro del where
async function getTienda(criterio) {
    const tienda = await persistence.searchByCriteria("Tiendas", { where: criterio });
    return tienda;
}

module.exports = { create, getTienda, update, readAll, readByName, deleteTienda };