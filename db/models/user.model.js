const {Model, DataTypes, Sequelize} = require('sequelize')

const USER_TABLE = 'user'

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  firstName: {
    field: 'first_name',
    allowNull: false,
    type: DataTypes.INTEGER
  },

  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.INTEGER
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  isRemove: {
    field: 'is_remove',
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'update_at',
    defaultValue: Sequelize.NOW
  },

}

class User extends Model {
  static associate(models){
    this.hasMany(models.Task, {
      as: 'task',
      foreignKey: 'user_id'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timesTamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
