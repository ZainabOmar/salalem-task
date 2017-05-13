
var Orders = (props) => (

	<div className="container">
	<h2><center><strong>You Have New Order</strong></center></h2>
	<div className="info" style = {{backgroundColor: '#e7f3fe', borderLeft: '30px solid #2196F3'}}>
	<h2><strong><center>Order Details</center></strong></h2>
	<ul style={{fontSize: '18px'}}>

	<li><strong>Client Name:</strong>
	<dd>- order CLientFullName </dd>
	</li>
	<li><strong>Cook Name:</strong>
	<dd>-  order Name </dd>
	</li>
	
	<li><strong>Amount:</strong>
	<dd>- order Quantity </dd>
	</li>
	
	<li><strong>The Client Will Receive The Order AT :</strong>
	<dd>- order DeliveryDate - at order DeliverTime</dd>
	</li>

	</ul>	
	</div>
	
	<center><strong>
	<p style=" font-size: 25px;"> I Can Handle It	<input type="checkbox" />
	</p>
	</strong>
	</center>
	</div>
	<center>
	<h3><strong>Okay, Let's Start Cooking...<span className="glyphicon glyphicon-cutlery"/></strong></h3>		
	</center>

	)

window.Orders = Orders;