const express = require('express');
const router = express.Router();
const User = require('../models/note.js');
const withAuth = require('../middlewares/auth');

//cria notas
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

//visualiza notas
router.get('/:id'.withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        let note = await Note.findById(id);
        if (isOwner(req.user, note)) {
            res.json(note)
        } else {
            res.status(403).json({ error: "Usuário sem premissão para visualizar esta nota" });
        }

    } catch (error) {
        res.status(500).json({ error: "Erro ao recuperar a nota" });
    }
})

//visualiza todas as notas
router.get('/', withAuth, async function (req, res) {
    try {
        let notes = await Note.find({ author: req.user._id })
        res.json(notes)
    } catch (error) {
        res.json({ error: error }).status(500)
    }
});

//modificar nota
router.put('/:id', withAuth, async function (req, res) {
    const { title, body } = req.body;
    const { id } = req.params;

    try {
        let note = await Note.findById(id);
        if (isOwner(req.user, note)) {
            let note = await Note.findOneAndUpdate(
                { _id: id },
                { $set: { title: title, body: body } },
                { upsert: true, 'new': true }
            )
            res.json(note);

        } else {
            res.status(403).json({ error: "Usuário sem premissão para editar esta nota" });
        }


    } catch (err) {
        res.status(500).json({ error: "Não foi possível atualizar a nota" });
    }

});

//deletar nota
router.delete('/:id', withAuth, async (req, res) => {
    const { id } = req.params;

    try {
        let note = await Note.findById(id);
        if (isOwner(req.user, note)) {
            await note.delete();
            res.json({ message: 'Conteúdo removido com sucesso.' }).status(204);

        } else {
            res.status(403).json({ error: "Usuário sem premissão para remover nota" });
        }

    } catch (error) {
        res.status(500).json({ error: "Não foi possível deletar a nota" });
    }

})

//Pesquisa de notas
router.get('/search', withAuth, async (req, res) => {
    const { query } = req.query;

    try {
        let notes = await Notes
            .find({ author: req.user._id })
            .find({ $text: { $search: query } });
        res.json(notes);

    } catch (error) {
        res.status(500).json({ error: "Nada foi encontrado" });
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