const {Model, DataTypes, Sequelize} = require('sequelize')
const TASKLIST_TABLE = 'taskList'

const TaskListSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING
  },

  isRemove: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_remove',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },

  updateAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'update_at',
    defaultValue: Sequelize.NOW
  }

}

class TaskList extends Model {
  static associate(models){
    this.hasMany(models.Task, {
      as: 'task',
      foreignKey: 'taskList_id'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TASKLIST_TABLE,
      modelName: 'TaskList',
      timestamps: false
    }
  }
}

module.exports = { TASKLIST_TABLE, TaskListSchema, TaskList }
