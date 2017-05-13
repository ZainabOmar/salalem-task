var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query('select * from CookNames', { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getCookNamesByID = function (ID, callback) {
    sequelize.query('select * from CookNames where ID = :ID', { replacements: { ID: ID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addCookName = function (CookNameObj, callback) {
    var Query = 'insert into CookNames (Name,TypeName) \
                 values (:Name,:TypeName) ';

    sequelize.query(Query, { replacements: { Name: CookNameObj.Name, TypeName: CookNameObj.TypeName }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}







