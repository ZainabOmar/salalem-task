var Profile = (props) => (
  <div className="row" style={{
    background: "url('assets/inside-bg.jpg')",
    backgroundPosition: 'top',
    minHeight: '500px',
    zIndex: '2',
    paddingTop: '100px'}}>
    <div className="row" style={{paddingBottom: '50px', margin: '0px'}}>
    <div className="col-md-10 col-md-offset-1 text-center">
    <div className="col-md-4 col-xs-12" style={{ color: '#fff', marginTop: '20px'}}>
    <img src="/assets/chef.png" className="img-responsive thumbnail" style={{margin: 'auto'}} />
    <img src="/ImgUrl" className="img-responsive thumbnail" style={{margin: 'auto'}}/>
    </div>
    <div className="col-md-8 col-xs-12" style={{color: '#fff', marginTop: '20px'}}>
    <h1 style={{fontWeight: 'bold', color: '#fff', textAlign: 'left', marginBottom: '40px'}}>
    data FullName </h1>
    <div className="col-md-6 col-xs-12">
    <i className="glyphicon glyphicon-phone" style="font-size: 3em;"></i>
    <p style="line-height: 40px;font-size: 15pt;">
    data PhoneNumber 
    </p>
    </div>
    <div className="col-md-6 col-xs-12">
    <i className="glyphicon glyphicon-envelope" style={{fontSize: '3em'}}></i>
    <p style={{lineHeight: '40px', fontSize: '15pt'}}> data Email </p>
    </div>
    </div>
    <div className="col-xs-12" style={{marginTop: '50px'}}>  
    <span style={{padding: '20px', fontSize: '1.7em', color: '#fff'}}><b> data FullName </b> cooking for today is : <b> data todayCook Name </b>, just for 
    <b> data todayCook Price </b> JOD!</span>
    <button className="btn btn-lg btn-primary">Order now</button>
    </div>
    </div>
    </div>
    </div>
    <div className="row" style= {{marginTop: '40px'}}>
    <div className="col-md-10 col-md-offset-1 col-xs-12">
    <div className="panel panel-default">
    <div className="panel-heading"><b> data user FullName </b> schedule</div>
    <table className="table">
    <tbody>
    <tr style={{fontWeight: 'bold'}}>
    <td>Day</td>
    <td> cook DayName </td>
    </tr>
    <tr>
    <td style={{fontWeight: 'bold'}}>Cooking</td>
    <td> cook CookeName </td>
    </tr>
    </tbody></table>
    </div>
    </div>
    </div>
    <div className="row">
    <div className="page-header text-center">
    <h1>User reviews <small> for data FullName </small></h1>
    </div>
    </div>
    <div className="row">
    <div className="col-md-10 col-md-offset-1 col-xs-12">

    <div className="col-md-6 col-xs-12">
    <div className="panel panel-default">
    <div className="panel-body"> comment ComBody </div>
    <div className="panel-footer"> comment InsertedUserFullName </div>
    </div>
    </div>

    </div>
    </div>
    )

window.Profile = Profile;