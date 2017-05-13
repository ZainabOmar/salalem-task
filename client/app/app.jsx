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

class App extends React.Component {
	render() {
	return (
		<div className="container-fluid">
		<nav className="navbar navbar-inverse" style = {{ margin: '25px 50px',
		backgroundColor: 'rgba(31, 31, 31, 0.7)',
		borderColor: '#484848',
		zIndex: '3',
		position: 'absolute'
	}}>
		<div className="container">
		<div className="navbar-header">
		<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		<span className="sr-only">Toggle navigation</span>
		<span className="icon-bar"></span>
		<span className="icon-bar"></span>
		<span clNameass="icon-bar"></span>
		</button>
		<a className="navbar-brand" href="#/" style = {{color: "#257204"}}>Otbo5ly
		<small> beta</small></a>
		</div>``
		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<ul className="nav navbar-nav">
		<li><a href="#/users">My Profile</a></li>
		<li><a href="#/orders">My Orders</a></li>
		<li><a href="#/signin">Sign In</a></li>
		<li><a href="#/signup">Sign Up</a></li>
		<li><a href="#/signout">Sign out</a></li>
		</ul>
		<ul className="nav navbar-nav navbar-right">
		<li><a href="http://www.rbk.org" target="_blank">RBK</a></li>
		<li className="dropdown">
		<a className="dropdown-toggleName" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Developers <span class="caret"></span></a>
		<ul className="dropdown-menu">
		<li><a href="https://github.com/montaserRahmani" target="_blank">M. Rahmani</a></li>
		<li><a href="https://github.com/saeedhomsy" target="_blank">S. Alhomsi</a></li>
		<li><a href="https://github.com/ZainabOmar" target="_blank">Z. Hammami</a></li>
		<li><a href="https://github.com/HadeelBaloush" target="_blank">H. Baloush</a></li>
		</ul>
		</li>
		</ul>
		</div>
		</div>
		</nav>
		</div>

		)}
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
