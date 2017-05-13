var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    var Query = 'select CookerSchedule.ID as CookerSchID,Users.ID as CookerID \
                ,CookerSchedule.DayName,Users.FullName,CookNames.Name as CookeName,CookNames.TypeName as CookTypeName from CookerSchedule \
                join Users on Users.ID = CookerSchedule.CookerID \
                join CookNames on CookNames.ID =CookerSchedule.CookNamesID \
                order by CookerSchedule.CookerID'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getCookerTodayCook = function (UserName, callback) {
    var Query = 'select Users.ID,Users.FullName,CookNames.Name,CookerSchedule.Price \
                 ,Users.Address \
                 from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "6" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "3" then "Wednesday" when "4" then "Thursday" when "5" then "Friday"  end) \
                 and Users.UserName = :UserName'
    sequelize.query(Query, { replacements: { UserName: UserName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getCookerSchedule = function (UserName, callback) {
    var Query = 'select CookerSchedule.ID as CookerSchID,Users.ID as CookerID \
                ,CookerSchedule.DayName,Users.FullName,CookNames.Name as CookeName,CookNames.TypeName as CookTypeName \
                ,Users.Address \
                ,CookerSchedule.Price \
                from CookerSchedule \
                join Users on Users.ID = CookerSchedule.CookerID \
                join CookNames on CookNames.ID =CookerSchedule.CookNamesID \
                where Users.UserName = :UserName \
                order by CookerSchedule.CookerID'
    sequelize.query(Query, { replacements: { UserName: UserName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getAllCookByDayNameOrderdByPrice = function (DayName, callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name, CookNames.ID, CookerSchedule.Price \
             ,Users.Address \
             ,CookerSchedule.Price \
             from CookerSchedule \
             join Users on Users.ID = CookerSchedule.CookerID \
             join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
             where CookerSchedule.DayName = :DayName \
             order by CookerSchedule.Price desc '
    sequelize.query(Query, { replacements: { DayName: DayName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getAllCookByDayNameOrderdByPrice = function (callback) {
    var Query = 'select Users.ID as cookerID,Users.FullName, Users.UserName, CookerSchedule.DayName,CookNames.Name, CookNames.ID as cookNameID, CookerSchedule.Price \
             ,Users.Address \
             ,CookerSchedule.Price \
             from CookerSchedule \
             join Users on Users.ID = CookerSchedule.CookerID \
             join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
             where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "6" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "3" then "Wednesday" when "4" then "Thursday" when "5" then "Friday"  end) \
             order by CookerSchedule.Price desc '
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getAllCookByDayNameOrderByOrders = function (DayName, callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 ,count(Orders.ID) as OrderNums \
                 ,Users.Address \
                 ,CookerSchedule.Price \
                 from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 left join Orders on Orders.CookerID = Users.ID \
                 where CookerSchedule.DayName = :DayName \
                 group by Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price,Users.Address \
                 order by count(Orders.ID) desc'
    sequelize.query(Query, { replacements: { DayName: DayName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getAllCookByDayNameOrderByOrders = function (callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 ,count(Orders.ID) as OrderNums \
                 ,Users.Address \
                 ,CookerSchedule.Price \
                 from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 left join Orders on Orders.CookerID = Users.ID \
                 where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "6" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "3" then "Wednesday" when "4" then "Thursday" when "5" then "Friday"  end) \
                 group by Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price,Users.Address \
                 order by count(Orders.ID) desc'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}




exports.addSchedule = function (ScheduleObj, callback) {
    var Query = 'insert into CookerSchedule (DayName, CookNamesID, CookerID, ImgUrl, Price) \
                  values (:DayName, :CookNamesID, :CookerID, :ImgUrl, :Price)'
    sequelize.query(Query, { replacements: { DayName: ScheduleObj.day, CookNamesID: ScheduleObj.cookID, CookerID: ScheduleObj.cookerID, ImgUrl: ScheduleObj.imgUrl, Price: ScheduleObj.price }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}





