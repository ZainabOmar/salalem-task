// angular.module('otbo5ly.main', [])

// .controller('MainController', function ($scope, $window, $location, Users, OrderService) {
//   $scope.data = {};

//   	Users.getTodayCookings().then(function(data){
//   		$scope.data.cookings = data;
//   	});

//   	// Users.getTopCookers().then(function(data){
//   	// 	$scope.data.cookers = data;
//   	// });

//   	$scope.setOrder = function(UserID, cookerID, cookNameID, FullName, cookName){
// 		OrderService.setOrder({userID: UserID, cookerID : cookerID,
// 			 CookNamesID: cookNameID, FullName : FullName, cookName: cookName});
// 	}

// })
var MainPage = (props) => (

  <div className="row" style={{background: 'url('assets/header-bg.jpg')',
backgroundPposition: 'bottom',
min-height: '500px',
zIndex: '2',
paddingTop: '100px'}}>

<div className="row" style={{paddingBottom: '50px', margin: '0px'}}>

<div className="col-md-10 col-md-offset-1 text-center">
  <h1 style = {{fontWeight: 'bold', color: '#fff'}}>Welcome to Otbo5ly!</h1>
  <h2 style= {{color: '#dedede'}}>Hungry ? want delicious home-made middle eastren food ?</h2>
  <h2 style= {{color: '#dedede'}}>YES! you are in the right place!</h2>

  <div className="col-md-6 col-xs-12" style= {{color: '#fff', marginTop: '20px'}}>
  <i className="glyphicon glyphicon-user" style= {{font-size: 5em;"></i>
  <br>

  <p style= {{padding: 20px;font-size: 1.3em;">Want to order food ?</p>
  <button href="#/signup" className="btn btn-lg btn-primary">Sign up now and start ordering!</button>

</div>

<div className="col-md-6 col-xs-12" style= {{color: '#fff;margin-top: 20px;border-left: 1px solid;">

<i className="glyphicon glyphicon-cutlery" style= {{font-size: 5em;"></i>
<br>

<p style= {{padding: 20px;font-size: 1.3em;">Ready to cook and sell ?</p>

<button href="#/signup" className="btn btn-lg btn-primary">Sign up now and start selling!</button></div>

</div></div>


</div>


<div className="row" style= {{margin-top: 40px;" ng-controller="MainController">

<div className="col-md-3 col-md-offset-1 col-xs-12">

<div className="panel panel-primary">

  <div className="panel-heading">
    <h3 className="panel-title">Top Cookers</h3>
  </div>
  
  <ul className="list-group">
    <li className="list-group-item" ng-repeat="cooker in data.cookings"><a href="#/users/{{ cooker.UserName }}"> {{ cooker.FullName }}</a></li>
  </ul>

  </div>
  </div>

  <div className="col-md-7 col-xs-12">

    <div className="panel panel-default">

      <div className="panel-heading">
        <h3 className="panel-title">Today's Cookings</h3>
      </div>

      <ul className="list-group">

        <li className="list-group-item" ng-repeat="cooking in data.cookings">
          <div className="row">
            <div className="col-md-4">
              <img ng-if="!cooking.ImgUrl" src="/assets/chef.png" className="img-responsive thumbnail" style= {{margin: auto;">
              <img ng-if="cooking.ImgUrl" src="/{{ cooking.ImgUrl }}" className="img-responsive thumbnail" style= {{margin: auto;">
            </div>
            <div className="col-md-8">
             <div className="caption" style= {{display: inline-block;height: 100%;">
             <h3>{{ cooking.Name }}</h3>
             <p><a href="#/users/{{ cooking.UserName }}">{{ cooking.FullName }}</a></p>
             <p className="btn btn-info" style= {{margin-bottom: 20px">{{ cooking.Price }} JOD</p>
             <p><a ng-click="setOrder($root.UserID, cooking.cookerID, cooking.cookNameID, cooking.FullName, cooking.Name)" className="btn btn-primary" role="button">Order Now</a> </p>
              </div>
            </div>
          </div>
        </li>

    </ul>
</div>
</div>
</div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.VideoList = VideoList;