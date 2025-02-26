const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'produtos',
  timestamps: false,
});

module.exports = Produto;
