const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const HistoricoConsumo = sequelize.define('HistoricoConsumo', {
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
  data_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ultima_utilizacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  frequencia_uso: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'historico_consumo',
  timestamps: false,
});

Produto.hasMany(HistoricoConsumo, { foreignKey: 'produto_id' });
HistoricoConsumo.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = HistoricoConsumo;
