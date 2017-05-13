'use strict';

angular.module('otbo5ly.services', []).factory('Users', function ($http) {
  return {

    getTopCookers: function getTopCookers() {
      return $http({
        method: 'GET',
        url: '/api/topCookers'
      }).then(function (resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    },

    getCookerOrders: function getCookerOrders(username) {
      return $http({
        method: 'GET',
        url: '/api/orders/' + username
      }).then(function (resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    },

    getCookerProfile: function getCookerProfile(username) {
      return $http({
        method: 'GET',
        url: '/api/users/' + username
      }).then(function (resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    },

    getTodayCookings: function getTodayCookings(username) {
      return $http({
        method: 'GET',
        url: '/api/todayCookings/'
      }).then(function (resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    },

    getCookingNames: function getCookingNames() {
      return $http({
        method: 'GET',
        url: '/api/cookingNames'
      }).then(function (resp) {
        console.log(resp.data);
        return resp.data;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    },

    addNewOrder: function addNewOrder(order) {
      return $http({
        method: 'POST',
        url: '/api/orders',
        data: order
      }).then(function (resp) {
        return resp;
      }).catch(function (err) {
        if (err) {
          console.log(err);
          return { status: 500 };
        }
      });
    }

  };
}).factory('Auth', function ($http, $location, $window, $rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function signin(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    }).then(function (resp) {
      return resp.data;
    });
  };

  var signup = function signup(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    }).then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function isAuth() {
    return !!$window.localStorage.getItem('com.otbo5ly');
  };

  var signout = function signout() {
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
}).factory('OrderService', function ($window, $location) {
  var order = {};
  return {
    setOrder: function setOrder(newOrder) {
      if ($window.localStorage.getItem('com.otbo5ly')) {
        order = newOrder;
        $location.path('/order/add');
      } else {
        $location.path('/signin');
      }
    },
    getOrder: function getOrder() {
      return order;
    },
    clearOrder: function clearOrder() {
      order = {};
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZmFjdG9yeSIsIiRodHRwIiwiZ2V0VG9wQ29va2VycyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJjYXRjaCIsImVyciIsImdldENvb2tlck9yZGVycyIsInVzZXJuYW1lIiwiZ2V0Q29va2VyUHJvZmlsZSIsImdldFRvZGF5Q29va2luZ3MiLCJnZXRDb29raW5nTmFtZXMiLCJhZGROZXdPcmRlciIsIm9yZGVyIiwic3RhdHVzIiwiJGxvY2F0aW9uIiwiJHdpbmRvdyIsIiRyb290U2NvcGUiLCJzaWduaW4iLCJ1c2VyIiwic2lnbnVwIiwiaXNBdXRoIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNpZ25vdXQiLCJyZW1vdmVJdGVtIiwiaXNMb2dnZWRJbiIsImlzQ29va2VyIiwiVXNlck5hbWUiLCJ1bmRlZmluZWQiLCJVc2VySUQiLCJwYXRoIiwic2V0T3JkZXIiLCJuZXdPcmRlciIsImdldE9yZGVyIiwiY2xlYXJPcmRlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsUUFBUUMsTUFBUixDQUFlLGtCQUFmLEVBQW1DLEVBQW5DLEVBRUNDLE9BRkQsQ0FFUyxPQUZULEVBRWtCLFVBQVVDLEtBQVYsRUFBaUI7QUFDakMsU0FBTzs7QUFFTEMsbUJBQWdCLHlCQUFVO0FBQ3hCLGFBQU9ELE1BQU07QUFDWEUsZ0JBQVEsS0FERztBQUVYQyxhQUFLO0FBRk0sT0FBTixFQUlKQyxJQUpJLENBSUMsVUFBVUMsSUFBVixFQUFnQjtBQUNwQkMsZ0JBQVFDLEdBQVIsQ0FBWUYsS0FBS0csSUFBakI7QUFDQSxlQUFPSCxLQUFLRyxJQUFaO0FBQ0QsT0FQSSxFQU9GQyxLQVBFLENBT0ksVUFBU0MsR0FBVCxFQUFhO0FBQ3BCLFlBQUdBLEdBQUgsRUFBUTtBQUNOSixrQkFBUUMsR0FBUixDQUFZRyxHQUFaO0FBQ0EsZ0JB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VCxFQUFrQkQsU0FBbEIsRUFBNEI7QUFDbkQsTUFBSUYsUUFBUSxFQUFaO0FBQ0EsU0FBTztBQUNMbUIsY0FBVyxrQkFBU0MsUUFBVCxFQUFrQjtBQUMzQixVQUFHakIsUUFBUU0sWUFBUixDQUFxQkMsT0FBckIsQ0FBNkIsYUFBN0IsQ0FBSCxFQUErQztBQUM3Q1YsZ0JBQVFvQixRQUFSO0FBQ0FsQixrQkFBVWdCLElBQVYsQ0FBZSxZQUFmO0FBQ0QsT0FIRCxNQUdPO0FBQ0xoQixrQkFBVWdCLElBQVYsQ0FBZSxTQUFmO0FBQ0Q7QUFDRixLQVJJO0FBU0xHLGNBQVcsb0JBQVU7QUFDbkIsYUFBT3JCLEtBQVA7QUFDRCxLQVhJO0FBWUxzQixnQkFBWSxzQkFBVTtBQUNwQnRCLGNBQVEsRUFBUjtBQUNEO0FBZEksR0FBUDtBQWdCRCxDQS9LRCIsImZpbGUiOiJzZXJ2aWNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdvdGJvNWx5LnNlcnZpY2VzJywgW10pXHJcblxyXG4uZmFjdG9yeSgnVXNlcnMnLCBmdW5jdGlvbiAoJGh0dHApIHtcclxuICByZXR1cm4ge1xyXG5cclxuICAgIGdldFRvcENvb2tlcnMgOiBmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdXJsOiAnL2FwaS90b3BDb29rZXJzJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3AuZGF0YTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgaWYoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvb2tlck9yZGVycyA6IGZ1bmN0aW9uKHVzZXJuYW1lKXtcclxuICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIHVybDogJy9hcGkvb3JkZXJzLycrIHVzZXJuYW1lLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzcC5kYXRhO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q29va2VyUHJvZmlsZSA6IGZ1bmN0aW9uKHVzZXJuYW1lKXtcclxuICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIHVybDogJy9hcGkvdXNlcnMvJysgdXNlcm5hbWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcC5kYXRhKTtcclxuICAgICAgICAgIHJldHVybiByZXNwLmRhdGE7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRUb2RheUNvb2tpbmdzIDogZnVuY3Rpb24odXNlcm5hbWUpe1xyXG4gICAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdXJsOiAnL2FwaS90b2RheUNvb2tpbmdzLycsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcC5kYXRhKTtcclxuICAgICAgICAgIHJldHVybiByZXNwLmRhdGE7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb29raW5nTmFtZXMgOiBmdW5jdGlvbigpe1xyXG4gICAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdXJsOiAnL2FwaS9jb29raW5nTmFtZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzcC5kYXRhO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkTmV3T3JkZXIgOiBmdW5jdGlvbihvcmRlcil7XHJcbiAgICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnL2FwaS9vcmRlcnMnLFxyXG4gICAgICAgIGRhdGEgOiBvcmRlclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgIHJldHVybiByZXNwO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtzdGF0dXM6NTAwfTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxufSlcclxuLmZhY3RvcnkoJ0F1dGgnLCBmdW5jdGlvbiAoJGh0dHAsICRsb2NhdGlvbiwgJHdpbmRvdywgJHJvb3RTY29wZSkge1xyXG4gIC8vIERvbid0IHRvdWNoIHRoaXMgQXV0aCBzZXJ2aWNlISEhXHJcbiAgLy8gaXQgaXMgcmVzcG9uc2libGUgZm9yIGF1dGhlbnRpY2F0aW5nIG91ciB1c2VyXHJcbiAgLy8gYnkgZXhjaGFuZ2luZyB0aGUgdXNlcidzIHVzZXJuYW1lIGFuZCBwYXNzd29yZFxyXG4gIC8vIGZvciBhIEpXVCBmcm9tIHRoZSBzZXJ2ZXJcclxuICAvLyB0aGF0IEpXVCBpcyB0aGVuIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2UgYXMgJ2NvbS5zaG9ydGx5J1xyXG4gIC8vIGFmdGVyIHlvdSBzaWduaW4vc2lnbnVwIG9wZW4gZGV2dG9vbHMsIGNsaWNrIHJlc291cmNlcyxcclxuICAvLyB0aGVuIGxvY2FsU3RvcmFnZSBhbmQgeW91J2xsIHNlZSB5b3VyIHRva2VuIGZyb20gdGhlIHNlcnZlclxyXG4gIHZhciBzaWduaW4gPSBmdW5jdGlvbiAodXNlcikge1xyXG4gICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIHVybDogJy9hcGkvdXNlcnMvc2lnbmluJyxcclxuICAgICAgZGF0YTogdXNlclxyXG4gICAgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgIHJldHVybiByZXNwLmRhdGE7XHJcbiAgICB9KTtcclxuICB9OyAgICAgICAgICBcclxuXHJcbiAgdmFyIHNpZ251cCA9IGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgdXJsOiAnL2FwaS91c2Vycy9zaWdudXAnLFxyXG4gICAgICBkYXRhOiB1c2VyXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgcmV0dXJuIHJlc3AuZGF0YTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc0F1dGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gISEkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpO1xyXG4gIH07XHJcblxyXG4gIHZhciBzaWdub3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29tLm90Ym81bHknKTtcclxuICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXIub3RibzVseScpO1xyXG4gICAgJHJvb3RTY29wZS5pc0xvZ2dlZEluID0gZmFsc2U7XHJcbiAgICAkcm9vdFNjb3BlLmlzQ29va2VyID0gZmFsc2U7XHJcbiAgICAkcm9vdFNjb3BlLlVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgJHJvb3RTY29wZS5Vc2VySUQgPSB1bmRlZmluZWQ7XHJcbiAgICAkbG9jYXRpb24ucGF0aCgnL3NpZ25pbicpO1xyXG4gIH07XHJcblxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2lnbmluOiBzaWduaW4sXHJcbiAgICBzaWdudXA6IHNpZ251cCxcclxuICAgIGlzQXV0aDogaXNBdXRoLFxyXG4gICAgc2lnbm91dDogc2lnbm91dFxyXG4gIH07XHJcbn0pXHJcblxyXG5cclxuLmZhY3RvcnkoJ09yZGVyU2VydmljZScsIGZ1bmN0aW9uKCR3aW5kb3csICRsb2NhdGlvbil7XHJcbiAgdmFyIG9yZGVyID0ge307XHJcbiAgcmV0dXJuIHtcclxuICAgIHNldE9yZGVyIDogZnVuY3Rpb24obmV3T3JkZXIpe1xyXG4gICAgICBpZigkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpKXtcclxuICAgICAgICBvcmRlciA9IG5ld09yZGVyO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvb3JkZXIvYWRkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zaWduaW4nKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldE9yZGVyIDogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIG9yZGVyO1xyXG4gICAgfSxcclxuICAgIGNsZWFyT3JkZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIG9yZGVyID0ge307XHJcbiAgICB9XHJcbiAgfVxyXG59KTsiXX0=