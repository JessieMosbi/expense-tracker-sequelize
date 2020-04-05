'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    joinTime: DataTypes.DATE
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Record)
  }
  return User
}
