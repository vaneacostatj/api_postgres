const {Model, DataTypes, Sequelize} = require('sequelize')
const {TASKLIST_TABLE} = require('./taskList.model')
const {USER_TABLE} = require('./user.model')
const TASK_TABLE = 'task'

const TaskSchema = {
  id: {
    allowNull: false, //permite o no que este campo sea falso
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  taskListId:{
    field: 'taskList_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TASKLIST_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING
  },

  description: {
    allowNull: false,
    type: DataTypes.TEXT
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

  updateAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'update_at',
    defaultValue: Sequelize.NOW
  }

}

class Task extends Model {
  static associate(models){
    this.belongsTo(models.TaskList, {as: 'taskList'});
    this.belongsTo(models.User, {as: 'user'})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timesTamps: false
    }
  }
}

module.exports = {TASK_TABLE, TaskSchema, Task }
