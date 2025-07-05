const express = require('express');
const router = express.Router();    
const cli_sorteo = require('./BD/conectar');

async function sorteoActivo(){
        let sorteo=null
        try {
            const db = await cli_sorteo.db("rifas_db");
            sorteo = await db.collection('sorteos').find({'activo':true}).toArray()[0];
        } finally {
            //await cli_sorteo.close();          
        }
    return sorteo;
        
}

router.get('/', async (req, res) => {
        let activo = await sorteoActivo()
        console.log(activo);
        let tit = activo ? activo.titulo : "No hay sorteos activos";     
        res.render("sorteos", {corporacion: "Gana tu Ride Ags", sorteoAct:activo,titulo:tit });
});






router.get('/insertar', (req, res) => {
    res.render('insertarSorteo');
}); 

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        await Sorteo.create(body);
        res.redirect('/Sorteos');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al insertar el sorteo');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const sorteoDB = await Sorteo.findOne({ _id: id });
        if (sorteoDB) {
            res.json(sorteoDB);
        } else {
            res.status(404).send('Sorteo no encontrado');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar el sorteo');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const sorteoDB = await Sorteo.findByIdAndDelete(id);
        if (sorteoDB) {
            res.json({ mensaje: 'Sorteo eliminado correctamente' });
        } else {
            res.status(404).json({ mensaje: 'Sorteo no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el sorteo');
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const sorteoDB = await Sorteo.findByIdAndUpdate(id, body, { new: true });
        if (sorteoDB) {
            res.json(sorteoDB);
        } else {
            res.status(404).send('Sorteo no encontrado');
        }       
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el sorteo');
    }
});

module.exports = router;