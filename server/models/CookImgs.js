var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAllCookerImgs = function (callback) {
    var Query = 'select CookImgs.ID as CookImgsID,Users.ID as CokkerID \
                ,CookImgs.ImgUrl, CookImgs.ImgDesc \
                ,Users.Address \
                from CookImgs \
                join Users on Users.ID = CookImgs.CookerID ';
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addCookImgs = function (cookImgsObj, callback) {
    var QUery = 'insert into CookImgs (CookerID, ImgUrl, ImgDesc) \
                 values (:CookerID, :ImgUrl, :ImgDesc) ';
    sequelize.query(Query, { replacements: { CookerID: cookImgsObj.CookerID, ImgUrl: cookImgsObj.ImgUrl, ImgDesc: cookImgsObj.ImgDesc }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




