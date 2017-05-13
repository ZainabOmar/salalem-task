class SignUp extends React.Component {
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

      <form>
      <div className="form-group">
      <label for="user">Full Name:</label>
      <input type="text" className="form-control" placeholder="your first and last name" required />
      </div>
      <div className="form-group">
      <label for="user">User Name:</label>
      <input type="text" className="form-control" placeholder="your name" required />
      </div>
      <div className="form-group">
      <label for="pwd">Password:</label>
      <input type="password" className="form-control" placeholder="your assword" required />
      </div>
      <div className="form-group">
      <label for = "phone">Phone Number:</label>
      <input  type="text" className="form-control" placeholder="your number" required />
      </div>
      <div className="form-group">
      <label for="user">Email address:</label>
      <input type="text" className="form-control" placeholder="your email" required />
      </div>
      <div className="form-group">
      <label for="user">Address:</label>
      <input type="text" className="form-control" placeholder="your address" required />
      </div>
      <div>
      <h3><strong>Are You Cooker ?! 
      </strong></h3>
      <div className="user" style = {{ fontSize: '17px' }}>
      <input name="userType" type="checkbox" /> Yub, I am Cooker
      </div>
      </div>
      <div>
      <h3><strong>Insert Your Cooking Schedule Here
      </strong></h3>
      <ul className="Days" style={{fontSize: '17px'}}>
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Saturday:</strong></h4>
      Price:
      <input type="text" name="price1" placeholder="JOD"/>
      
      <h4>Cooking Name:</h4>
      <select style= {{width: '250px'}}>
      <option >cook name</option>
      </select>
      </li>
      </ul>
      
      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Sunday:</strong></h4>
      Price:
      <input type="text" name="price2" placeholder="JOD" />

      <h4>Cooking Name:</h4>
      <select style={{ width: '250px' }}>
      <option>cook name</option>
      </select>
      </li>
      </ul>
      
      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Monday:</strong></h4>
      Price:
      <input type="text" name="price3" placeholder="JOD" />
      
      <h4>Cooking Name:</h4>
      <select style={{width: '250px'}}>
      <option>cook name </option>
      </select>
      </li>
      </ul>
      
      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Tuesday:</strong></h4>
      Price:
      <input type="text" name="price4" placeholder="JOD" />
      
      <h4>Cooking Name:</h4>
      <select  style={{ width: '250px'}}>
      <option> cook name</option>
      </select>
      </li>
      </ul>


      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Wednesday:</strong></h4>
      Price:
      <input type="text" name="price5" placeholder="JOD" />
      
      <h4>Cooking Name:</h4>
      <select style= {{width: '250px'}}>
      <option> cook name</option>
      </select>
      </li>
      </ul>
      
      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Thursday:</strong></h4>
      Price:
      <input type="text" name="price6" placeholder="JOD" />
      
      <h4>Cooking Name:</h4>
      <select style={{width: '250px'}}>
      <option> cook name</option>
      </select>
      </li>
      </ul>
      
      <ul className="Days">
      <li><h4 className="h4" style = {{ color: '#1E90FF'}}><strong>Friday:</strong></h4>
      Price:
      <input type="text" name="price7" placeholder="JOD" />
      
      <h4>Cooking Name:</h4>
      <select style={{width: '250px'}}>
      <option> cook name</option>
      </select>
      </li>
      </ul>
      
      </div>

      <input type="submit" className="btn btn-info" value="Submit" />
      </form>

      user schedule


      <h4><strong>Do you have account already?</strong></h4>
      <a href="#/signin">
      <input type="submit" className="btn btn-danger" value="Signin" />
      </a>
      </div>
      </div>
      )
}
}

window.SignUp = SignUp;