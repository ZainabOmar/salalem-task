<!-- In this page we are sending the cooker a message telling him
	about the client's order details (time, cookName and quantity). -->
<!-- We don't really care about the date because it will be sent the next day always. -->
	<style>
		.info {
			background-color: #e7f3fe;
			border-left: 30px solid #2196F3;
		}
	</style>

	<div class="container" ng-controller="ProfileController" ng-init="getOrders()">
		<br><br><br><br>
		<h2><center><strong>You Have New Order</strong></center></h2>
		<div class="info" ng-repeat="order in orders"><br>
			<h2><strong><center>Order Details</center></strong></h2>
			<ul style="font-size:18px">

				<li><strong>Client Name:</strong>
					<dd>- {{ order.CLientFullName }}</dd>
				</li>
				<li><strong>Cook Name:</strong>
					<dd>- {{ order.Name }}</dd>
				</li>
				<br>
				<li><strong>Amount:</strong>
				<dd>- {{ order.Quantity }}</dd>
				</li>
				<br>
				<li><strong>The Client Will Receive The Order AT :</strong>
					<dd>- {{ order.DeliveryDate }}    - at {{order.DeliverTime}}</dd>
				</li>

			</ul><br>	
		</div>
		<br><br>
		<center><strong>
			<p style=" font-size: 25px;"> I Can Handle It	<input type="checkbox" ng-model = "accept" ng-init = "false">
			</p>
		</strong>
	</center>
	<div ng-if="accept">
		<center>
			<h3><strong>Okay, Let's Start Cooking...<span class="glyphicon glyphicon-cutlery"></strong></h3>		
		</center>
	</div>
</div>