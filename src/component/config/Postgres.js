// const Sequelize = require('sequelize');

// // Option 1: Passing parameters separately
// const sequelize = new Sequelize('Unichat', 'postgres', '1', {
//   host: 'localhost',
//   dialect: 'postgres' 
// });

// const sequelize = new Sequelize(/* ... */ {
//     // ...
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });
//   Sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   }).catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });