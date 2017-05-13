angular.module('otbo5ly.services', [])

.factory('Users', function ($http) {
  return {

    getTopCookers : function(){
      return $http({
        method: 'GET',
        url: '/api/topCookers',
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    },

    getCookerOrders : function(username){
      return $http({
        method: 'GET',
        url: '/api/orders/'+ username,
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    },

    getCookerProfile : function(username){
      return $http({
        method: 'GET',
        url: '/api/users/'+ username,
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    },

    getTodayCookings : function(username){
      return $http({
        method: 'GET',
        url: '/api/todayCookings/',
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    },

    getCookingNames : function(){
      return $http({
        method: 'GET',
        url: '/api/cookingNames',
        })
        .then(function (resp) {
          console.log(resp.data);
          return resp.data;
        }).catch(function(err){
          if(err) {
            console.log(err);
            throw err;
          }
      });
    },

    addNewOrder : function(order){
      return $http({
        method: 'POST',
        url: '/api/orders',
        data : order
        })
        .then(function (resp) {
          return resp;
        }).catch(function(err){
          if(err) {
            console.log(err);
            return {status:500};
          }
      });
    }

  }
})
.factory('Auth', function ($http, $location, $window, $rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };          

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.otbo5ly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.otbo5ly');
    $window.localStorage.removeItem('user.otbo5ly');
    $rootScope.isLoggedIn = false;
    $rootScope.isCooker = false;
    $rootScope.UserName = undefined;
    $rootScope.UserID = undefined;
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})


.factory('OrderService', function($window, $location){
  var order = {};
  return {
    setOrder : function(newOrder){
      if($window.localStorage.getItem('com.otbo5ly')){
        order = newOrder;
        $location.path('/order/add');
      } else {
        $location.path('/signin');
      }
    },
    getOrder : function(){
      return order;
    },
    clearOrder: function(){
      order = {};
    }
  }
});