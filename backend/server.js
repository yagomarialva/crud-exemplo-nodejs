require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Importando as rotas
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
console.log("Variáveis de ambiente:", process.env.DB_USER, process.env.DB_NAME);
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

// Usar as rotas
app.use('/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
