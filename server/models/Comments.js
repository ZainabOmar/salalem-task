var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAllCookerComments = function (UserName,callback) {
    var Query = 'select  Comments.ID as CommentsID, InsertedUser.ID as InsertUserID , Cooker.ID as CookerID \
                ,  InsertedUser.FullName  as InsertedUserFullName, InsertedUser.ImgUrl as InsertedUserImg \
                ,  Cooker.FullName  as CookerFullName, Cooker.ImgUrl as CookerImgUrl \
                ,Comments.HTMLBody as ComBody \
                ,Cooker.Address as CookerAddress \
                ,InsertedUser.Address as InsertedUserAddress \
                from Comments \
                join Users as InsertedUser On InsertedUser.ID = Comments.InsertUserID \
                Join Users as Cooker on Cooker.ID = Comments.CookerID  \
                where Cooker.UserName = :UserName'
    sequelize.query(Query, { replacements:{UserName:UserName}, type: Sequelize.QueryTypes.SELECT })
    .then(callback)
}


exports.getTopCookerComments = function (callback) {
    var Query = 'select  Comments.ID as CommentsID, InsertedUser.ID as InsertUserID , Cooker.ID as CookerID \
                 ,  InsertedUser.FullName  as InsertedUserFullName, InsertedUser.ImgUrl as InsertedUserImg \
                 ,  Cooker.FullName  as CookerFullName, Cooker.ImgUrl as CookerImgUrl \
                 ,Comments.HTMLBody as ComBody \
                 ,Cooker.Address as CookerAddress \
                 ,InsertedUser.Address as InsertedUserAddress \
                 from Comments \
                 join Users as InsertedUser On InsertedUser.ID = Comments.InsertUserID \
                 Join Users as Cooker on Cooker.ID = Comments.CookerID \
                 limit 3'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addComment = function (CommentObj, callback) {
    var Query = 'insert into Comments (CookerID, HTMLBody, InsertUserID) \
                 values (:CookerID, :HTMLBody, :InsertUserID) ';

    sequelize.query(Query, { replacements: { CookerID: CommentObj.CookerID, HTMLBody: CommentObj.HTMLBody, InsertUserID: CommentObj.InsertUserID }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}







