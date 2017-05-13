"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// angular.module('otbo5ly', [
//   'otbo5ly.services',
//   'otbo5ly.profile',
//   'otbo5ly.auth',
//   'otbo5ly.main',
//   'otbo5ly.newOrder',
//   'ngRoute'
// ])
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'app/account/signin.html',
//       controller: 'AuthController' 
//     })
//     .when('/signup', {
//       templateUrl: 'app/account/signup.html',
//       controller: 'AuthController'
//     })    
//     .when('/signout', {
//       templateUrl: 'app/account/signout.html',
//       controller: 'AuthController'
//     })
//     .when('/users/:user', {
//       templateUrl: 'app/profile/profile.html',
//       controller: 'ProfileController'
//     })
//     .when('/orders/:user', {
//       templateUrl: 'app/profile/orders.html',
//       controller: 'ProfileController',
//       authenticate: true
//     })
//     .when('/order/add', {
//       templateUrl: 'app/order/order.html',
//       controller: 'NewOrderController',
//       authenticate: true
//     })
//     .when('/', {
//       templateUrl: 'app/main/main.html',
//       controller: 'MainController'
//     })
//     .otherwise({redirectTo:'/'});

//     // We add our $httpInterceptor into the array
//     // of interceptors. Think of it like middleware for your ajax calls
//   $httpProvider.interceptors.push('AttachTokens');

// })
// .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.otbo5ly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, $window, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });

//   //initialzing $rootScope with user data if signed in to show properly data

//     if($window.localStorage.getItem('com.otbo5ly')){

//       var temp = JSON.parse($window.localStorage.getItem('user.otbo5ly'));

//       $rootScope.isLoggedIn = true;
//       $rootScope.UserName = temp.UserName;
//       $rootScope.UserID = temp.ID;

//       if(temp.UserTypeName === "cooker"){
//         $rootScope.isCooker = true;
//       }

//     }
// });

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      console.log("hello");
      return React.createElement(
        "h1",
        null,
        "Hello World"
      );
    }
  }]);

  return App;
}(React.Component);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined


window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmpzeCJdLCJuYW1lcyI6WyJBcHAiLCJjb25zb2xlIiwibG9nIiwiUmVhY3QiLCJDb21wb25lbnQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0lBRU1BLEc7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1RDLGNBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0UsYUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREU7QUFFRjs7OztFQUxnQkMsTUFBTUMsUzs7QUFReEI7QUFDQTs7O0FBQ0FDLE9BQU9MLEdBQVAsR0FBYUEsR0FBYiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyLm1vZHVsZSgnb3RibzVseScsIFtcclxuLy8gICAnb3RibzVseS5zZXJ2aWNlcycsXHJcbi8vICAgJ290Ym81bHkucHJvZmlsZScsXHJcbi8vICAgJ290Ym81bHkuYXV0aCcsXHJcbi8vICAgJ290Ym81bHkubWFpbicsXHJcbi8vICAgJ290Ym81bHkubmV3T3JkZXInLFxyXG4vLyAgICduZ1JvdXRlJ1xyXG4vLyBdKVxyXG4vLyAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG4vLyAgICRyb3V0ZVByb3ZpZGVyXHJcbi8vICAgICAud2hlbignL3NpZ25pbicsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWNjb3VudC9zaWduaW4uaHRtbCcsXHJcbi8vICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29udHJvbGxlcicgXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy9zaWdudXAnLCB7XHJcbi8vICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2FjY291bnQvc2lnbnVwLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbnRyb2xsZXInXHJcbi8vICAgICB9KSAgICBcclxuLy8gICAgIC53aGVuKCcvc2lnbm91dCcsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWNjb3VudC9zaWdub3V0Lmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy91c2Vycy86dXNlcicsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvcHJvZmlsZS9wcm9maWxlLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy9vcmRlcnMvOnVzZXInLCB7XHJcbi8vICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3Byb2ZpbGUvb3JkZXJzLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInLFxyXG4vLyAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuLy8gICAgIH0pXHJcbi8vICAgICAud2hlbignL29yZGVyL2FkZCcsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvb3JkZXIvb3JkZXIuaHRtbCcsXHJcbi8vICAgICAgIGNvbnRyb2xsZXI6ICdOZXdPcmRlckNvbnRyb2xsZXInLFxyXG4vLyAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuLy8gICAgIH0pXHJcbi8vICAgICAud2hlbignLycsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLm90aGVyd2lzZSh7cmVkaXJlY3RUbzonLyd9KTtcclxuXHJcbi8vICAgICAvLyBXZSBhZGQgb3VyICRodHRwSW50ZXJjZXB0b3IgaW50byB0aGUgYXJyYXlcclxuLy8gICAgIC8vIG9mIGludGVyY2VwdG9ycy4gVGhpbmsgb2YgaXQgbGlrZSBtaWRkbGV3YXJlIGZvciB5b3VyIGFqYXggY2FsbHNcclxuLy8gICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdBdHRhY2hUb2tlbnMnKTtcclxuXHJcbi8vIH0pXHJcbi8vIC5mYWN0b3J5KCdBdHRhY2hUb2tlbnMnLCBmdW5jdGlvbiAoJHdpbmRvdykge1xyXG4vLyAgIC8vIHRoaXMgaXMgYW4gJGh0dHBJbnRlcmNlcHRvclxyXG4vLyAgIC8vIGl0cyBqb2IgaXMgdG8gc3RvcCBhbGwgb3V0IGdvaW5nIHJlcXVlc3RcclxuLy8gICAvLyB0aGVuIGxvb2sgaW4gbG9jYWwgc3RvcmFnZSBhbmQgZmluZCB0aGUgdXNlcidzIHRva2VuXHJcbi8vICAgLy8gdGhlbiBhZGQgaXQgdG8gdGhlIGhlYWRlciBzbyB0aGUgc2VydmVyIGNhbiB2YWxpZGF0ZSB0aGUgcmVxdWVzdFxyXG4vLyAgIHZhciBhdHRhY2ggPSB7XHJcbi8vICAgICByZXF1ZXN0OiBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbi8vICAgICAgIHZhciBqd3QgPSAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpO1xyXG4vLyAgICAgICBpZiAoand0KSB7XHJcbi8vICAgICAgICAgb2JqZWN0LmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSBqd3Q7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgb2JqZWN0LmhlYWRlcnNbJ0FsbG93LUNvbnRyb2wtQWxsb3ctT3JpZ2luJ10gPSAnKic7XHJcbi8vICAgICAgIHJldHVybiBvYmplY3Q7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuLy8gICByZXR1cm4gYXR0YWNoO1xyXG4vLyB9KVxyXG4vLyAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkbG9jYXRpb24sICR3aW5kb3csIEF1dGgpIHtcclxuLy8gICAvLyBoZXJlIGluc2lkZSB0aGUgcnVuIHBoYXNlIG9mIGFuZ3VsYXIsIG91ciBzZXJ2aWNlcyBhbmQgY29udHJvbGxlcnNcclxuLy8gICAvLyBoYXZlIGp1c3QgYmVlbiByZWdpc3RlcmVkIGFuZCBvdXIgYXBwIGlzIHJlYWR5XHJcbi8vICAgLy8gaG93ZXZlciwgd2Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHVzZXIgaXMgYXV0aG9yaXplZFxyXG4vLyAgIC8vIHdlIGxpc3RlbiBmb3Igd2hlbiBhbmd1bGFyIGlzIHRyeWluZyB0byBjaGFuZ2Ugcm91dGVzXHJcbi8vICAgLy8gd2hlbiBpdCBkb2VzIGNoYW5nZSByb3V0ZXMsIHdlIHRoZW4gbG9vayBmb3IgdGhlIHRva2VuIGluIGxvY2Fsc3RvcmFnZVxyXG4vLyAgIC8vIGFuZCBzZW5kIHRoYXQgdG9rZW4gdG8gdGhlIHNlcnZlciB0byBzZWUgaWYgaXQgaXMgYSByZWFsIHVzZXIgb3IgaGFzbid0IGV4cGlyZWRcclxuLy8gICAvLyBpZiBpdCdzIG5vdCB2YWxpZCwgd2UgdGhlbiByZWRpcmVjdCBiYWNrIHRvIHNpZ25pbi9zaWdudXBcclxuLy8gICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZ0LCBuZXh0LCBjdXJyZW50KSB7XHJcbi8vICAgICBpZiAobmV4dC4kJHJvdXRlICYmIG5leHQuJCRyb3V0ZS5hdXRoZW50aWNhdGUgJiYgIUF1dGguaXNBdXRoKCkpIHtcclxuLy8gICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zaWduaW4nKTtcclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuXHJcbi8vICAgLy9pbml0aWFsemluZyAkcm9vdFNjb3BlIHdpdGggdXNlciBkYXRhIGlmIHNpZ25lZCBpbiB0byBzaG93IHByb3Blcmx5IGRhdGFcclxuXHJcbi8vICAgICBpZigkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpKXtcclxuXHJcbi8vICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZSgkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyLm90Ym81bHknKSk7XHJcblxyXG4vLyAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkSW4gPSB0cnVlO1xyXG4vLyAgICAgICAkcm9vdFNjb3BlLlVzZXJOYW1lID0gdGVtcC5Vc2VyTmFtZTtcclxuLy8gICAgICAgJHJvb3RTY29wZS5Vc2VySUQgPSB0ZW1wLklEO1xyXG5cclxuLy8gICAgICAgaWYodGVtcC5Vc2VyVHlwZU5hbWUgPT09IFwiY29va2VyXCIpe1xyXG4vLyAgICAgICAgICRyb290U2NvcGUuaXNDb29rZXIgPSB0cnVlO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gIGNvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuICAgIHJldHVybiAoXHJcbiAgPGgxPkhlbGxvIFdvcmxkPC9oMT5cclxuKX1cclxufVxyXG5cclxuLy8gSW4gdGhlIEVTNiBzcGVjLCBmaWxlcyBhcmUgXCJtb2R1bGVzXCIgYW5kIGRvIG5vdCBzaGFyZSBhIHRvcC1sZXZlbCBzY29wZVxyXG4vLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZFxyXG53aW5kb3cuQXBwID0gQXBwO1xyXG4iXX0=