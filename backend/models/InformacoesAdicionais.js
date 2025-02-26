const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const InformacoesAdicionais = sequelize.define('InformacoesAdicionais', {
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
  marca: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fornecedor: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  codigo_barras: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'informacoes_adicionais',
  timestamps: false,
});

Produto.hasOne(InformacoesAdicionais, { foreignKey: 'produto_id' });
InformacoesAdicionais.belongsTo(Produto, { foreignKey: 'produto_id' });

module.exports = InformacoesAdicionais;
