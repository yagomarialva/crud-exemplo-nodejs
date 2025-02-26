const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantidade_atual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  unidade_medida: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  quantidade_minima: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  data_validade: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  local_armazenamento: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'estoque',
  timestamps: false,
});

Produto.hasOne(Estoque, { foreignKey: 'produto_id' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = Estoque;
