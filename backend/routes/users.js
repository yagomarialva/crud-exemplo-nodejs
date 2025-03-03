const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar usuário
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if(user) res.json(user);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [updated] = await User.update({ name, email }, {
      where: { id: req.params.id }
    });
    if(updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.json(updatedUser);
    }
    throw new Error('Usuário não encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if(deleted) res.json({ message: 'Usuário deletado' });
    else throw new Error('Usuário não encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
