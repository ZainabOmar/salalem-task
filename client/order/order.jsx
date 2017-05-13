
var Order = (props) => (
	
	<div className="row" style= {{
		background: "url('assets/header-bg.jpg')",
		backgroundPosition: 'bottom',
		minHeight: '250px',
		zIndex: '2',
		paddingTop: '100px'
	}}>
	<div className="row" style={{paddingBottom: '50px', margin: '0px'}}>
	<div className="col-md-10 col-md-offset-1 text-center">
	<h1 style={{fontWeight: 'bold', color: '#fff'}}>Order at Otbo5ly!</h1>
	<h2 style={{color: '#dedede'}}>1 more step to enjoy our delicious home-made food!</h2>
	<h2 style={{color: '#dedede'}}>Yalla!</h2>
	</div></div>
	</div>
	<div className="row" style={{marginTop: '50px'}}>
	<div className="col-md-10 col-md-offset-1">
	<div className="panel panel-default">
	<div className="panel-heading">
	<h3 className="panel-title">Order Details</h3>
	</div>
	<div className="panel-body">
	<div className="form-group">
	<h4 style= {{color : '#025eaf'}}> Cooking ordered: </h4>
	<p style={{fontSize: '13pt'}}>
	<b> order cookName </b>     from      <b>order FullName </b>
	</p>
	<h4> Delivery Date: </h4>
	<div className="input-group">
	<p style={{fontSize: '13pt'}}>
	<b>order deliveryDate</b>
	</p>
	</div>
	<h4> Number of Meals: </h4>
	<div className="input-group">
	<input type="text" className="form-control" placeholder="Quantity" aria-describedby="basic-addon2" />
	<span className="input-group-addon" id="basic-addon2" required>Meals</span>
	</div>
	<h4> Delivery Time: </h4>
	<div className="input-group">
	<input type="text" className="form-control" placeholder="which hour ?" 
	aria-describedby="basic-addon3" required />
	<span className="input-group-addon" id="basic-addon3">ex : 4:00</span>
	</div>
	<button className="btn btn-lg btn-primary">Submit order!</button>
	</div>
	</div>
	</div>
	</div>
	</div>

	)

window.Order = Order;
