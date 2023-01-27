import sequelize from 'sequelize';

export default new sequelize('bcc_chall', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
