const express = require('express');
const router = express.Router();
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

// Criar um item no estoque
router.post('/', async (req, res) => {
    try {
        const { produto_id, quantidade_atual, unidade_medida, quantidade_minima, data_validade, local_armazenamento } = req.body;

        // Verifica se o produto existe antes de adicionar ao estoque
        const produto = await Produto.findByPk(produto_id);
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

        const estoque = await Estoque.create({
            produto_id,
            quantidade_atual,
            unidade_medida,
            quantidade_minima,
            data_validade,
            local_armazenamento
        });

        res.status(201).json(estoque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar todos os itens do estoque
router.get('/', async (req, res) => {
    try {
        const estoque = await Estoque.findAll({ include: Produto });
        res.json(estoque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar um item do estoque por ID
router.get('/:id', async (req, res) => {
    try {
        const estoque = await Estoque.findByPk(req.params.id, { include: Produto });
        if (estoque) res.json(estoque);
        else res.status(404).json({ error: 'Item do estoque não encontrado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar um item do estoque
router.put('/:id', async (req, res) => {
    try {
        const { quantidade_atual, unidade_medida, quantidade_minima, data_validade, local_armazenamento } = req.body;
        const [updated] = await Estoque.update(
            { quantidade_atual, unidade_medida, quantidade_minima, data_validade, local_armazenamento },
            { where: { id: req.params.id } }
        );

        if (updated) {
            const updatedEstoque = await Estoque.findByPk(req.params.id);
            return res.json(updatedEstoque);
        }
        throw new Error('Item do estoque não encontrado');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar um item do estoque
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Estoque.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({ message: 'Item do estoque deletado' });
        else throw new Error('Item do estoque não encontrado');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
