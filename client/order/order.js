angular.module('otbo5ly.newOrder', [])


.controller('NewOrderController', function ($scope, $location, Users, Auth, OrderService) {
	
	$scope.order = {};

	if(!OrderService.getOrder().userID){
		alert('you should choose what to order first!');
		$location.path('/');
	} else {
		Object.assign($scope.order, OrderService.getOrder());
		//console.log("order coming from main ---- ", $scope.order);
	}

	var getDeliveryDate = function(){
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + 1);
		return todayDate;
	}

	$scope.order.deliveryDate = getDeliveryDate().toISOString().slice(0,10);

	$scope.addOrder = function(){
		Users.addNewOrder($scope.order).then(function(resp){
			if(resp.status === 500) {
				alert('Something went wrong try again');
			} else {
				alert('your order has been sent successfully')
				$location.path('/');
			}
		})
	}
	
});
