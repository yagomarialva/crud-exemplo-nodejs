require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Importando as rotas
const userRoutes = require('./routes/users');
const produtoRoutes = require('./routes/produto');
const estoqueRoutes = require('./routes/estoque');

const app = express();

app.use(cors());
app.use(express.json());

console.log("Variáveis de ambiente:", process.env.DB_USER, process.env.DB_NAME);

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API CRUD",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Arquivos onde estão os endpoints
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use('/produto', produtoRoutes);
app.use('/estoque', estoqueRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
