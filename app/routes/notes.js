const express = require('express');
const router = express.Router();
const User = require('../models/note.js');
const withAuth = require('../middlewares/auth');


router.post('/', withAuth, async (req, res) => {
    const { title, body } = req.body;


    try {
        let note = new Note({ title: title, body: body, author: req.user._id });
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a nota" });
    }
})

router.get('/:id'.withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        let note = await Note.findById(id);
        if (isOwner(req.user, note)){
            res.json(note)
        }else{
            res.status(403).json({ error: "Usuário sem premissão para visualizar esta nota" });
        }

    } catch (error) {
        res.status(500).json({ error: "Erro ao recuperar a nota" });
    }
})

/*
Verifica se quem solicitou a nota é o proprietario da mesma
*/
const isOwner = (user, note) => {
    if (JSON.stringify(user.id) == JSON.stringify(note.author._id)) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;