class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style = {{backgroundImage: 'url(/assets/header-bg.jpg)',
			backgroundPosition: 'bottom',
			paddingTop: '10px'}}>
			<div>
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
		</div>
		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<ul className="nav navbar-nav">
		<li><a href="#/users">My Profile</a></li>
		<li><a href="#/orders">My Orders</a></li>
		<li> <a href = "#/signin">Sign In</a></li>
		<li><a href="<SignUp></SignUp>">Sign Up</a></li>
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
		<div>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		</div>
		</div>
		<MainPage></MainPage>
		<Router history={hashHistory}>
		<Route path='/signup' component={SignUp}>signup</Route>
		<Route path='signin' component={SignIn}>signin</Route>
		</Router>
		</div>
		)}
	}

	// In the ES6 spec, files are "modules" and do not share a top-level scope
	// `var` declarations will only exist globally where explicitly defined
	window.App = App;
