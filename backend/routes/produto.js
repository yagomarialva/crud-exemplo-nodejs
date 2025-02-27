const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Produto = require('../models/Produto');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - categoria
 *         - marca
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *         marca:
 *           type: string
 *           description: Marca do produto
 */

// Middleware de validação
const validateProduto = [
  body('nome').notEmpty().withMessage('O nome é obrigatório'),
  body('categoria').notEmpty().withMessage('A categoria é obrigatória'),
  body('marca').notEmpty().withMessage('A marca é obrigatória'),
];

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', validateProduto, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, categoria, marca } = req.body;
    const produto = await Produto.create({ nome, categoria, marca });
    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno ao criar produto' });
  }
});

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Retorna a lista de produto
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produto retornada com sucesso
 */
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno ao listar produtos' });
  }
});

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro interno ao buscar produto' });
  }
});

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', validateProduto, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, categoria, marca } = req.body;
    const [updated] = await Produto.update({ nome, categoria, marca }, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado para atualização' });
    }

    const updatedProduto = await Produto.findByPk(req.params.id);
    res.json(updatedProduto);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar produto' });
  }
});

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Produto.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado para exclusão' });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro interno ao deletar produto' });
  }
});

module.exports = router;
