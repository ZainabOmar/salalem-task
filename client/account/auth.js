angular.module('otbo5ly.auth', [])

.controller('AuthController', function ($scope, $window, $location, $rootScope, Auth, Users) {
  $scope.user = {};

  Users.getCookingNames().then(function(data){
    $scope.cookingNames = data;
  })


  $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (data) {
          //console.log(data)

          if(data.status === '500'){
            $scope.msg = 'Wrong password or username!'
          } else {

            $scope.msg = '';

            $window.localStorage.setItem('com.otbo5ly', data.token);

            var userData = {ID:data.ID, 
              UserName: data.UserName, UserTypeName: data.UserTypeName};
 
            $window.localStorage.setItem('user.otbo5ly', JSON.stringify(userData));

            $rootScope.isLoggedIn = true;
            $rootScope.UserName = data.UserName;
            $rootScope.UserID = data.ID;

            if(data.UserTypeName === 'cooker'){
              $rootScope.isCooker = true;
              $location.path('/users/'+ data.UserName );
            } else {
              $location.path('/');
            }
            
          }


        })
        .catch(function (error) {
          console.log(error);
        });
  };

  $scope.signup = function () {
      if($scope.isCooker){
        $scope.user.userType = 'cooker';
      } else {
        $scope.user.userType = 'user';
      }
      Auth.signup($scope.user)
        .then(function (data) {
          //console.log(data)

         if(data.status === '500'){
            $scope.msg = 'Wrong password or username!'
          } else {

            $scope.msg = '';

            $window.localStorage.setItem('com.otbo5ly', data.token);

            var userData = {ID:data.ID, 
              UserName: data.UserName, UserTypeName: data.UserTypeName};
 
            $window.localStorage.setItem('user.otbo5ly', JSON.stringify(userData));

            $rootScope.isLoggedIn = true;
            $rootScope.UserName = data.UserName;
            $rootScope.UserID = data.ID;

            if(data.UserTypeName === 'cooker'){
              $rootScope.isCooker = true;
              $location.path('/users/'+ data.UserName );
            } else {
              $location.path('/');
            }
            
          }
          
        })
        .catch(function (error) {
          console.error(error);
        });
  };

  $scope.signout = function(){
    Auth.signout();
  }

  // var checkPassword = function(password){
  //   var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  //   return regularExpression.test(password);
  // };

  // var checkUserName = function(user){
  //   var regularExpression = /^[a-zA-Z0-9]+$/;
  //   return regularExpression.test(user);
  // };

});
