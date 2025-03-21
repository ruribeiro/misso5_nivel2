const express = require('express');
const router = express.Router();
const livroDao = require('../modelo/livro-dao');
const mongoose = require('mongoose');

// Rota para obter todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await livroDao.obterLivros();
        res.status(200).json(livros);
    } catch (error) {
        console.error('Erro ao obter os livros:', error);
        res.status(500).json({ mensagem: 'Erro ao obter os livros' });
    }
});

// Rota para incluir um novo livro
router.post('/', async (req, res) => {
    try {
        const novoLivro = req.body;

        // Validação básica
        if (!novoLivro || !novoLivro.titulo || !novoLivro.autor) {
            return res.status(400).json({ mensagem: 'Dados do livro incompletos. É necessário informar título e autor.' });
        }

        novoLivro._id = new mongoose.Types.ObjectId();
        const resultado = await livroDao.incluir(novoLivro);

        if (resultado) {
            res.status(201).json({ mensagem: 'Livro incluído com sucesso', livro: resultado });
        } else {
            res.status(500).json({ mensagem: 'Falha ao incluir o livro' });
        }
    } catch (error) {
        console.error('Erro ao incluir o livro:', error);
        res.status(500).json({ mensagem: 'Erro interno ao incluir o livro' });
    }
});

// Rota para excluir um livro pelo código
router.delete('/:codigo', async (req, res) => {
    try {
        const livroId = req.params.codigo;

        // Validação do ID
        if (!mongoose.Types.ObjectId.isValid(livroId)) {
            return res.status(400).json({ mensagem: 'ID inválido. Certifique-se de que o ID está correto.' });
        }

        const resultado = await livroDao.excluir(livroId);

        if (resultado) {
            res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        res.status(500).json({ mensagem: 'Erro interno ao excluir o livro' });
    }
});

module.exports = router;