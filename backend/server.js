require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados!');
    await sequelize.sync();
    console.log('Tabelas sincronizadas!');
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
})();

// Criar usuário
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar usuário por ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if(user) res.json(user);
    else res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar usuário
app.put('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if(deleted) res.json({ message: 'Usuário deletado' });
    else throw new Error('Usuário não encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
