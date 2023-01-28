import sequelize from 'sequelize';

export default new sequelize('bcc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
