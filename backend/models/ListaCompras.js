const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const ListaCompras = sequelize.define('ListaCompras', {
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
  status: {
    type: DataTypes.ENUM('Disponível', 'Baixo', 'Esgotado'),
    allowNull: false,
  },
  sugestao_recompra: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  preco_medio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'lista_compras',
  timestamps: false,
});

Produto.hasOne(ListaCompras, { foreignKey: 'produto_id' });
ListaCompras.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = ListaCompras;
