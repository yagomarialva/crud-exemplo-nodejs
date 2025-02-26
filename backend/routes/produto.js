const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Criar Produto
router.post('/', async (req, res) => {
    try {
        const { nome, categoria, marca } = req.body;
        const produto = await Produto.create({ nome, categoria, marca });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar um produto por ID
router.get('/:id', async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) res.json(produto);
        else res.status(404).json({ error: 'Produto não encontrado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
    try {
        const { nome, categoria, marca } = req.body;
        const [updated] = await Produto.update({ nome, categoria, marca }, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedProduto = await Produto.findByPk(req.params.id);
            return res.json(updatedProduto);
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Produto.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({ message: 'Produto deletado' });
        else throw new Error('Produto não encontrado');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
