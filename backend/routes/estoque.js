const express = require('express');
const router = express.Router();
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

/**
 * @swagger
 * tags:
 *   name: Estoque
 *   description: Gerenciamento de estoque
 */

/**
 * @swagger
 * /estoque:
 *   post:
 *     summary: Criar um item no estoque
 *     tags: [Estoque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produto_id:
 *                 type: integer
 *               quantidade_atual:
 *                 type: number
 *               unidade_medida:
 *                 type: string
 *               quantidade_minima:
 *                 type: number
 *               data_validade:
 *                 type: string
 *                 format: date
 *               local_armazenamento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', async (req, res) => {
    try {
        const { produto_id, quantidade_atual, unidade_medida, quantidade_minima, data_validade, local_armazenamento } = req.body;
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

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Listar todos os itens do estoque
 *     tags: [Estoque]
 *     responses:
 *       200:
 *         description: Lista de itens do estoque
 */
router.get('/', async (req, res) => {
    try {
        const estoque = await Estoque.findAll({ include: Produto });
        res.json(estoque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /estoque/{id}:
 *   get:
 *     summary: Buscar um item do estoque por ID
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do item do estoque
 *       404:
 *         description: Item não encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const estoque = await Estoque.findByPk(req.params.id, { include: Produto });
        if (estoque) res.json(estoque);
        else res.status(404).json({ error: 'Item do estoque não encontrado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /estoque/{id}:
 *   put:
 *     summary: Atualizar um item do estoque
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade_atual:
 *                 type: number
 *               unidade_medida:
 *                 type: string
 *               quantidade_minima:
 *                 type: number
 *               data_validade:
 *                 type: string
 *                 format: date
 *               local_armazenamento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Item não encontrado
 */
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

/**
 * @swagger
 * /estoque/{id}:
 *   delete:
 *     summary: Deletar um item do estoque
 *     tags: [Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
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
