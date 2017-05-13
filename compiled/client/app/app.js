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
			return React.createElement(
				"div",
				{ className: "container-fluid" },
				React.createElement(
					"nav",
					{ className: "navbar navbar-inverse", style: { margin: '25px 50px',
							backgroundColor: 'rgba(31, 31, 31, 0.7)',
							borderColor: '#484848',
							zIndex: '3',
							position: 'absolute'
						} },
					React.createElement(
						"div",
						{ className: "container" },
						React.createElement(
							"div",
							{ className: "navbar-header" },
							React.createElement(
								"button",
								{ type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false" },
								React.createElement(
									"span",
									{ className: "sr-only" },
									"Toggle navigation"
								),
								React.createElement("span", { className: "icon-bar" }),
								React.createElement("span", { className: "icon-bar" }),
								React.createElement("span", { clNameass: "icon-bar" })
							),
							React.createElement(
								"a",
								{ className: "navbar-brand", href: "#/", style: { color: "#257204" } },
								"Otbo5ly",
								React.createElement(
									"small",
									null,
									" beta"
								)
							)
						),
						"``",
						React.createElement(
							"div",
							{ className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
							React.createElement(
								"ul",
								{ className: "nav navbar-nav" },
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/users" },
										"My Profile"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/orders" },
										"My Orders"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/signin" },
										"Sign In"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/signup" },
										"Sign Up"
									)
								),
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "#/signout" },
										"Sign out"
									)
								)
							),
							React.createElement(
								"ul",
								{ className: "nav navbar-nav navbar-right" },
								React.createElement(
									"li",
									null,
									React.createElement(
										"a",
										{ href: "http://www.rbk.org", target: "_blank" },
										"RBK"
									)
								),
								React.createElement(
									"li",
									{ className: "dropdown" },
									React.createElement(
										"a",
										{ className: "dropdown-toggleName", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false" },
										"Developers ",
										React.createElement("span", { "class": "caret" })
									),
									React.createElement(
										"ul",
										{ className: "dropdown-menu" },
										React.createElement(
											"li",
											null,
											React.createElement(
												"a",
												{ href: "https://github.com/montaserRahmani", target: "_blank" },
												"M. Rahmani"
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"a",
												{ href: "https://github.com/saeedhomsy", target: "_blank" },
												"S. Alhomsi"
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"a",
												{ href: "https://github.com/ZainabOmar", target: "_blank" },
												"Z. Hammami"
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"a",
												{ href: "https://github.com/HadeelBaloush", target: "_blank" },
												"H. Baloush"
											)
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined


window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmpzeCJdLCJuYW1lcyI6WyJBcHAiLCJtYXJnaW4iLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsInpJbmRleCIsInBvc2l0aW9uIiwiY29sb3IiLCJSZWFjdCIsIkNvbXBvbmVudCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7SUFFTUEsRzs7Ozs7Ozs7Ozs7MkJBQ0k7QUFDVCxVQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsaUJBQWY7QUFDQTtBQUFBO0FBQUEsT0FBSyxXQUFVLHVCQUFmLEVBQXVDLE9BQVMsRUFBRUMsUUFBUSxXQUFWO0FBQ2hEQyx3QkFBaUIsdUJBRCtCO0FBRWhEQyxvQkFBYSxTQUZtQztBQUdoREMsZUFBUSxHQUh3QztBQUloREMsaUJBQVU7QUFKc0MsT0FBaEQ7QUFNQTtBQUFBO0FBQUEsUUFBSyxXQUFVLFdBQWY7QUFDQTtBQUFBO0FBQUEsU0FBSyxXQUFVLGVBQWY7QUFDQTtBQUFBO0FBQUEsVUFBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSx5QkFBaEMsRUFBMEQsZUFBWSxVQUF0RSxFQUFpRixlQUFZLCtCQUE3RixFQUE2SCxpQkFBYyxPQUEzSTtBQUNBO0FBQUE7QUFBQSxXQUFNLFdBQVUsU0FBaEI7QUFBQTtBQUFBLFNBREE7QUFFQSxzQ0FBTSxXQUFVLFVBQWhCLEdBRkE7QUFHQSxzQ0FBTSxXQUFVLFVBQWhCLEdBSEE7QUFJQSxzQ0FBTSxXQUFVLFVBQWhCO0FBSkEsUUFEQTtBQU9BO0FBQUE7QUFBQSxVQUFHLFdBQVUsY0FBYixFQUE0QixNQUFLLElBQWpDLEVBQXNDLE9BQVMsRUFBQ0MsT0FBTyxTQUFSLEVBQS9DO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFQQSxPQURBO0FBQUE7QUFXQTtBQUFBO0FBQUEsU0FBSyxXQUFVLDBCQUFmLEVBQTBDLElBQUcsOEJBQTdDO0FBQ0E7QUFBQTtBQUFBLFVBQUksV0FBVSxnQkFBZDtBQUNBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxZQUFHLE1BQUssU0FBUjtBQUFBO0FBQUE7QUFBSixTQURBO0FBRUE7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLFlBQUcsTUFBSyxVQUFSO0FBQUE7QUFBQTtBQUFKLFNBRkE7QUFHQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsWUFBRyxNQUFLLFVBQVI7QUFBQTtBQUFBO0FBQUosU0FIQTtBQUlBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxZQUFHLE1BQUssVUFBUjtBQUFBO0FBQUE7QUFBSixTQUpBO0FBS0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLFlBQUcsTUFBSyxXQUFSO0FBQUE7QUFBQTtBQUFKO0FBTEEsUUFEQTtBQVFBO0FBQUE7QUFBQSxVQUFJLFdBQVUsNkJBQWQ7QUFDQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsWUFBRyxNQUFLLG9CQUFSLEVBQTZCLFFBQU8sUUFBcEM7QUFBQTtBQUFBO0FBQUosU0FEQTtBQUVBO0FBQUE7QUFBQSxXQUFJLFdBQVUsVUFBZDtBQUNBO0FBQUE7QUFBQSxZQUFHLFdBQVUscUJBQWIsRUFBbUMsZUFBWSxVQUEvQyxFQUEwRCxNQUFLLFFBQS9ELEVBQXdFLGlCQUFjLE1BQXRGLEVBQTZGLGlCQUFjLE9BQTNHO0FBQUE7QUFBOEgsd0NBQU0sU0FBTSxPQUFaO0FBQTlILFVBREE7QUFFQTtBQUFBO0FBQUEsWUFBSSxXQUFVLGVBQWQ7QUFDQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLG9DQUFSLEVBQTZDLFFBQU8sUUFBcEQ7QUFBQTtBQUFBO0FBQUosV0FEQTtBQUVBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxjQUFHLE1BQUssK0JBQVIsRUFBd0MsUUFBTyxRQUEvQztBQUFBO0FBQUE7QUFBSixXQUZBO0FBR0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGNBQUcsTUFBSywrQkFBUixFQUF3QyxRQUFPLFFBQS9DO0FBQUE7QUFBQTtBQUFKLFdBSEE7QUFJQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLGtDQUFSLEVBQTJDLFFBQU8sUUFBbEQ7QUFBQTtBQUFBO0FBQUo7QUFKQTtBQUZBO0FBRkE7QUFSQTtBQVhBO0FBTkE7QUFEQSxJQUREO0FBNENHOzs7O0VBOUNjQyxNQUFNQyxTOztBQWlEeEI7QUFDQTs7O0FBQ0FDLE9BQU9ULEdBQVAsR0FBYUEsR0FBYiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbmd1bGFyLm1vZHVsZSgnb3RibzVseScsIFtcclxuLy8gICAnb3RibzVseS5zZXJ2aWNlcycsXHJcbi8vICAgJ290Ym81bHkucHJvZmlsZScsXHJcbi8vICAgJ290Ym81bHkuYXV0aCcsXHJcbi8vICAgJ290Ym81bHkubWFpbicsXHJcbi8vICAgJ290Ym81bHkubmV3T3JkZXInLFxyXG4vLyAgICduZ1JvdXRlJ1xyXG4vLyBdKVxyXG4vLyAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG4vLyAgICRyb3V0ZVByb3ZpZGVyXHJcbi8vICAgICAud2hlbignL3NpZ25pbicsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWNjb3VudC9zaWduaW4uaHRtbCcsXHJcbi8vICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoQ29udHJvbGxlcicgXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy9zaWdudXAnLCB7XHJcbi8vICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2FjY291bnQvc2lnbnVwLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbnRyb2xsZXInXHJcbi8vICAgICB9KSAgICBcclxuLy8gICAgIC53aGVuKCcvc2lnbm91dCcsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYWNjb3VudC9zaWdub3V0Lmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnQXV0aENvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy91c2Vycy86dXNlcicsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvcHJvZmlsZS9wcm9maWxlLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLndoZW4oJy9vcmRlcnMvOnVzZXInLCB7XHJcbi8vICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3Byb2ZpbGUvb3JkZXJzLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUNvbnRyb2xsZXInLFxyXG4vLyAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuLy8gICAgIH0pXHJcbi8vICAgICAud2hlbignL29yZGVyL2FkZCcsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvb3JkZXIvb3JkZXIuaHRtbCcsXHJcbi8vICAgICAgIGNvbnRyb2xsZXI6ICdOZXdPcmRlckNvbnRyb2xsZXInLFxyXG4vLyAgICAgICBhdXRoZW50aWNhdGU6IHRydWVcclxuLy8gICAgIH0pXHJcbi8vICAgICAud2hlbignLycsIHtcclxuLy8gICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbWFpbi9tYWluLmh0bWwnLFxyXG4vLyAgICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInXHJcbi8vICAgICB9KVxyXG4vLyAgICAgLm90aGVyd2lzZSh7cmVkaXJlY3RUbzonLyd9KTtcclxuXHJcbi8vICAgICAvLyBXZSBhZGQgb3VyICRodHRwSW50ZXJjZXB0b3IgaW50byB0aGUgYXJyYXlcclxuLy8gICAgIC8vIG9mIGludGVyY2VwdG9ycy4gVGhpbmsgb2YgaXQgbGlrZSBtaWRkbGV3YXJlIGZvciB5b3VyIGFqYXggY2FsbHNcclxuLy8gICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdBdHRhY2hUb2tlbnMnKTtcclxuXHJcbi8vIH0pXHJcbi8vIC5mYWN0b3J5KCdBdHRhY2hUb2tlbnMnLCBmdW5jdGlvbiAoJHdpbmRvdykge1xyXG4vLyAgIC8vIHRoaXMgaXMgYW4gJGh0dHBJbnRlcmNlcHRvclxyXG4vLyAgIC8vIGl0cyBqb2IgaXMgdG8gc3RvcCBhbGwgb3V0IGdvaW5nIHJlcXVlc3RcclxuLy8gICAvLyB0aGVuIGxvb2sgaW4gbG9jYWwgc3RvcmFnZSBhbmQgZmluZCB0aGUgdXNlcidzIHRva2VuXHJcbi8vICAgLy8gdGhlbiBhZGQgaXQgdG8gdGhlIGhlYWRlciBzbyB0aGUgc2VydmVyIGNhbiB2YWxpZGF0ZSB0aGUgcmVxdWVzdFxyXG4vLyAgIHZhciBhdHRhY2ggPSB7XHJcbi8vICAgICByZXF1ZXN0OiBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbi8vICAgICAgIHZhciBqd3QgPSAkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpO1xyXG4vLyAgICAgICBpZiAoand0KSB7XHJcbi8vICAgICAgICAgb2JqZWN0LmhlYWRlcnNbJ3gtYWNjZXNzLXRva2VuJ10gPSBqd3Q7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgb2JqZWN0LmhlYWRlcnNbJ0FsbG93LUNvbnRyb2wtQWxsb3ctT3JpZ2luJ10gPSAnKic7XHJcbi8vICAgICAgIHJldHVybiBvYmplY3Q7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuLy8gICByZXR1cm4gYXR0YWNoO1xyXG4vLyB9KVxyXG4vLyAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkbG9jYXRpb24sICR3aW5kb3csIEF1dGgpIHtcclxuLy8gICAvLyBoZXJlIGluc2lkZSB0aGUgcnVuIHBoYXNlIG9mIGFuZ3VsYXIsIG91ciBzZXJ2aWNlcyBhbmQgY29udHJvbGxlcnNcclxuLy8gICAvLyBoYXZlIGp1c3QgYmVlbiByZWdpc3RlcmVkIGFuZCBvdXIgYXBwIGlzIHJlYWR5XHJcbi8vICAgLy8gaG93ZXZlciwgd2Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHVzZXIgaXMgYXV0aG9yaXplZFxyXG4vLyAgIC8vIHdlIGxpc3RlbiBmb3Igd2hlbiBhbmd1bGFyIGlzIHRyeWluZyB0byBjaGFuZ2Ugcm91dGVzXHJcbi8vICAgLy8gd2hlbiBpdCBkb2VzIGNoYW5nZSByb3V0ZXMsIHdlIHRoZW4gbG9vayBmb3IgdGhlIHRva2VuIGluIGxvY2Fsc3RvcmFnZVxyXG4vLyAgIC8vIGFuZCBzZW5kIHRoYXQgdG9rZW4gdG8gdGhlIHNlcnZlciB0byBzZWUgaWYgaXQgaXMgYSByZWFsIHVzZXIgb3IgaGFzbid0IGV4cGlyZWRcclxuLy8gICAvLyBpZiBpdCdzIG5vdCB2YWxpZCwgd2UgdGhlbiByZWRpcmVjdCBiYWNrIHRvIHNpZ25pbi9zaWdudXBcclxuLy8gICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZ0LCBuZXh0LCBjdXJyZW50KSB7XHJcbi8vICAgICBpZiAobmV4dC4kJHJvdXRlICYmIG5leHQuJCRyb3V0ZS5hdXRoZW50aWNhdGUgJiYgIUF1dGguaXNBdXRoKCkpIHtcclxuLy8gICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zaWduaW4nKTtcclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuXHJcbi8vICAgLy9pbml0aWFsemluZyAkcm9vdFNjb3BlIHdpdGggdXNlciBkYXRhIGlmIHNpZ25lZCBpbiB0byBzaG93IHByb3Blcmx5IGRhdGFcclxuXHJcbi8vICAgICBpZigkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb20ub3RibzVseScpKXtcclxuXHJcbi8vICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZSgkd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyLm90Ym81bHknKSk7XHJcblxyXG4vLyAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkSW4gPSB0cnVlO1xyXG4vLyAgICAgICAkcm9vdFNjb3BlLlVzZXJOYW1lID0gdGVtcC5Vc2VyTmFtZTtcclxuLy8gICAgICAgJHJvb3RTY29wZS5Vc2VySUQgPSB0ZW1wLklEO1xyXG5cclxuLy8gICAgICAgaWYodGVtcC5Vc2VyVHlwZU5hbWUgPT09IFwiY29va2VyXCIpe1xyXG4vLyAgICAgICAgICRyb290U2NvcGUuaXNDb29rZXIgPSB0cnVlO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG5cdFx0PG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWludmVyc2VcIiBzdHlsZSA9IHt7IG1hcmdpbjogJzI1cHggNTBweCcsXHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDMxLCAzMSwgMzEsIDAuNyknLFxyXG5cdFx0Ym9yZGVyQ29sb3I6ICcjNDg0ODQ4JyxcclxuXHRcdHpJbmRleDogJzMnLFxyXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcclxuXHR9fT5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuXHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGUgY29sbGFwc2VkXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2JzLWV4YW1wbGUtbmF2YmFyLWNvbGxhcHNlLTFcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Ub2dnbGUgbmF2aWdhdGlvbjwvc3Bhbj5cclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCI+PC9zcGFuPlxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIj48L3NwYW4+XHJcblx0XHQ8c3BhbiBjbE5hbWVhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj5cclxuXHRcdDwvYnV0dG9uPlxyXG5cdFx0PGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiMvXCIgc3R5bGUgPSB7e2NvbG9yOiBcIiMyNTcyMDRcIn19Pk90Ym81bHlcclxuXHRcdDxzbWFsbD4gYmV0YTwvc21hbGw+PC9hPlxyXG5cdFx0PC9kaXY+YGBcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xXCI+XHJcblx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj5cclxuXHRcdDxsaT48YSBocmVmPVwiIy91c2Vyc1wiPk15IFByb2ZpbGU8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiIy9vcmRlcnNcIj5NeSBPcmRlcnM8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiIy9zaWduaW5cIj5TaWduIEluPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cIiMvc2lnbnVwXCI+U2lnbiBVcDwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCIjL3NpZ25vdXRcIj5TaWduIG91dDwvYT48L2xpPlxyXG5cdFx0PC91bD5cclxuXHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcIj5cclxuXHRcdDxsaT48YSBocmVmPVwiaHR0cDovL3d3dy5yYmsub3JnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+UkJLPC9hPjwvbGk+XHJcblx0XHQ8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd25cIj5cclxuXHRcdDxhIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZU5hbWVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+RGV2ZWxvcGVycyA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPjwvYT5cclxuXHRcdDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9tb250YXNlclJhaG1hbmlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5NLiBSYWhtYW5pPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zYWVlZGhvbXN5XCIgdGFyZ2V0PVwiX2JsYW5rXCI+Uy4gQWxob21zaTwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vWmFpbmFiT21hclwiIHRhcmdldD1cIl9ibGFua1wiPlouIEhhbW1hbWk8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0hhZGVlbEJhbG91c2hcIiB0YXJnZXQ9XCJfYmxhbmtcIj5ILiBCYWxvdXNoPC9hPjwvbGk+XHJcblx0XHQ8L3VsPlxyXG5cdFx0PC9saT5cclxuXHRcdDwvdWw+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PC9uYXY+XHJcblx0XHQ8L2Rpdj5cclxuXHJcblx0XHQpfVxyXG59XHJcblxyXG4vLyBJbiB0aGUgRVM2IHNwZWMsIGZpbGVzIGFyZSBcIm1vZHVsZXNcIiBhbmQgZG8gbm90IHNoYXJlIGEgdG9wLWxldmVsIHNjb3BlXHJcbi8vIGB2YXJgIGRlY2xhcmF0aW9ucyB3aWxsIG9ubHkgZXhpc3QgZ2xvYmFsbHkgd2hlcmUgZXhwbGljaXRseSBkZWZpbmVkXHJcbndpbmRvdy5BcHAgPSBBcHA7XHJcbiJdfQ==