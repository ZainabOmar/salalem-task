<!-- Everything is clear here, this page is just for signing in. -->
<div class="row" style="
background: url('assets/header-bg.jpg');
background-position: bottom;
min-height: 250px;
z-index: 2;
padding-top: 100px;
">

<div class="row" style="padding-bottom: 50px;margin:0px;">
<div class="col-md-10 col-md-offset-1 text-center">
  <h1 style="font-weight: bold;color: #fff;">Sign In at Otbo5ly!</h1>
  <h2 style="color: #dedede;">Sign in and enjoy our features! Start ordering home-made food!</h2>
  <h2 style="color: #dedede;">Yalla!</h2>
</div></div>
</div>


<div id='signin' class="container" ng-controller="AuthController">
  <br><br><br>
	<form name="signinForm" ng-submit='signin()'>
		<div class="form-group">
			<label for="user">User Name:</label>
			<input type="text" class="form-control" placeholder="your name" ng-model='user.username' required>
		</div>
		<div class="form-group">
			<label for="pwd">Password:</label>
			<input type="password" class="form-control" placeholder="your password" ng-model='user.password' required>
			<br>
		</div>
		<input type="submit" class="btn btn-info" value="Submit">
	</form>
	<br>
	<div>
		<h4><strong>Don't you have account?</strong></h4>
		<br>
		<a href="#/signup">
			<input type="submit" class="btn btn-danger" value="Signup">
		</a>
	</div>
</div> 