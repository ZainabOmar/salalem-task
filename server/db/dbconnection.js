var Sequelize = require('sequelize')

var sequelize = new Sequelize('GFProj.sqlite', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './GFProj.sqlite'
});


sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connected');
    })
    .catch(function (err) {
        console.log('Unable to connect :', err);
    });

module.exports = sequelize;