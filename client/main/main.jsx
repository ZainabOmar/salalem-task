
var MainPage = (props) => (
  <div className = "container">
  <div className="row" style={{paddingBottom: '50px', margin: '0px'}}>
  <div className="col-md-10 col-md-offset-1 text-center">
  <h1 style = {{fontWeight: 'bold', color: '#fff'}}>Welcome to Otbo5ly!</h1>
  <h2 style= {{color: '#dedede'}}>Hungry ? want delicious home-made middle eastren food ?</h2>
  <h2 style= {{color: '#dedede'}}>YES! you are in the right place!</h2>
  <div className="col-md-6 col-xs-12" style= {{color: '#fff', marginTop: '20px'}}>
  <i className="glyphicon glyphicon-user" style= {{fontSize: '5em'}}></i>
  <p style= {{padding: '20px', fontSize: '1.3em'}}>Want to order food ?</p>
  <button href="#/signup" className="btn btn-lg btn-primary">Sign up now and start ordering!</button>
  </div>
  <div className="col-md-6 col-xs-12" style= {{color: '#fff', marginTop: '20px', borderLeft: '1px solid'}}>
  <i className="glyphicon glyphicon-cutlery" style= {{fontSize: '5em'}}></i>
  <p style= {{padding: '20px', fontSize: '1.3em'}}>Ready to cook and sell ?</p>
  <button href="#/signup" className="btn btn-lg btn-primary">Sign up now and start selling!</button>
  </div>
  </div>
  </div>
 

   <div className="row" style= {{marginTop: '40px'}}>
  <div className="col-md-3 col-md-offset-1 col-xs-12">
  <div className="panel panel-primary">
  <div className="panel-heading">
  <h3 className="panel-title">Top Cookers</h3>
  </div>
  <ul className="list-group">
  <li className="list-group-item">Om Ta7seen<a href="#/users"></a></li>
  <li className="list-group-item">Om A7mad<a href="#/users"></a></li>
  <li className="list-group-item">Om Ali<a href="#/users"></a></li>
  </ul>
  </div>
  </div>
  <div className="col-md-7 col-xs-12">
  <div className="panel panel-default">
  <div className="panel-heading">
  <h3 className="panel-title">Today's Cookings</h3>
  </div>
  <ul className="list-group">
  <li className="list-group-item">
  <div className="row">
  <div className="col-md-4">
  <img src="/assets/chef.png" className="img-responsive thumbnail" style= {{margin: 'auto'}}/>
  <img className="img-responsive thumbnail" style= {{margin: 'auto'}}/>
  </div>
  <div className="col-md-8">
  <div className="caption" style= {{display: 'inline-block', height: '100%'}}>
  <h3>Om Ta7seen</h3>
  <p><a href="#/users"></a></p>
  <p className="btn btn-info" style= {{marginBottom:'20px'}}>30 JOD</p>
  <p><a className="btn btn-primary" role="button">Order Now</a> </p>
  </div>
  </div>
  </div>
  </li>
  </ul>
  </div>
  </div>
</div>
  </div>
  );

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.MainPage = MainPage;