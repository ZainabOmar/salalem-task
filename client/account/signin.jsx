//Everything is clear here, this page is just for signing in.
class SignIn extends React.Component {
	render() {
		return (
			<div>
			<div className="row" style= {{
				background: 'url(/assets/header-bg.jpg)',
				backgroundPosition: 'bottom',
				minHeight: '250px',
				zIndex: '2',
				paddingTop: '100px'
			}}>

			<div className="row" style={{paddingBottom: '50px', margin: '0px'}}>
			<div className="col-md-10 col-md-offset-1 text-center">
			<h1 style={{fontWeight: 'bold', color: '#fff'}}>Sign In at Otbo5ly!</h1>
			<h2 style={{color: '#dedede'}}>Sign in and enjoy our features! Start ordering home-made food!</h2>
			<h2 style={{color: '#dedede'}}>Yalla!</h2>
			</div></div>
			</div>


			<div className="container">
			
			<form name="signinForm">
			<div className="form-group">
			<label for="user">User Name:</label>
			<input type="text" className="form-control" placeholder="your name" required/>
			</div>
			<div className="form-group">
			<label for="pwd">Password:</label>
			<input type="password" className="form-control" placeholder="your password" required/>
			<br></br>
			</div>
			<input type="submit" className="btn btn-info" value="Submit"/>
			</form>
			<br></br>
			<div>
			<h4><strong>Don't you have account?</strong></h4>
			<br></br>
			<a href="#/signup">
			<input type="submit" className="btn btn-danger" value="Signup"/>
			</a>
			</div>
			</div>
			</div>
			)
	}
}

window.SignIn = SignIn;