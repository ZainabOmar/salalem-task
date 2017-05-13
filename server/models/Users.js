var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query("select * from Users", { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getUserByID = function (ID, callback) {
    sequelize.query("select * from Users where ID = :ID", { replacements: { ID: ID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getUserProfileInfo = function (username, callback) {
    sequelize.query("select ID,Fullname,Email,PhoneNumber,ImgUrl,Address,UserName,UserTypeName from Users where UserName = :UserName", { replacements: { UserName: username }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getUserByEmail = function (email, callback) {
    sequelize.query("select * from Users where Email = :Email", { replacements: { Email: email }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getUserByPhone = function (phone, callback) {
    sequelize.query("select * from Users where PhoneNumber = :PhoneNumber", { replacements: { PhoneNumber: phone }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getUserByUsername = function (username, callback) {
    sequelize.query("select * from Users where UserName = :UserName", { replacements: { UserName: username }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getTopCookers = function (callback) {
    var Query = 'select Users.ID,Users.FullName ,Users.UserName , count(Orders.ID) as OrderNums,Users.Address \
                 from CookerSchedule  \
                 join Users on Users.ID = CookerSchedule.CookerID  \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID  \
                 left join Orders on Orders.CookerID = Users.ID \
                 group by Users.ID,Users.FullName,Users.Address  \
                 order by count(Orders.ID) desc'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addUser = function (userObj, callback) {
    var Query = 'insert into Users (FullName,UserName,Email,PhoneNumber,UserTypeName,Password,ImgUrl,Address) \
                 values (:FullName,:UserName,:Email,:PhoneNumber,:UserTypeName,:Password,:ImgUrl,:Address)';
    sequelize.query(Query, { replacements: { FullName: userObj.fullname, UserName: userObj.username, Email: userObj.email, PhoneNumber: userObj.phone, UserTypeName: userObj.userType, Password: userObj.password, ImgUrl: userObj.imgUrl, Address: userObj.address }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




