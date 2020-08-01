import React , {useState, Fragment, useEffect} from 'react';
let prevRoute = [''];

const SignIn = (props) => {
  const [Semail, setemail] = useState('');
  const [Spassword, setpassword] = useState('');
  const [Serror, setSerror] = useState(false);
  const [error_msg, seterror_msg] = useState('');



  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    seterror_msg('')
    setSerror(false);
    setemail('');
    setpassword('');
  }, [props.route]);

  //Register
  const [Sname, setname] = useState('');
  const onNameChange = (event) =>{
    setname(event.target.value)
    // console.log(event.target.value);
  }
  const onRegister = () =>{
    fetch('https://obscure-refuge-34122.herokuapp.com/register',{
    method :'post',
    headers :{'content-type': 'application/json'},
    body:JSON.stringify({
      email: Semail,
      password:Spassword,
      name:Sname
      })
    })
    .then(resp => resp.json())
    .then(user =>{
      if (user.id){
        setSerror(false);
        props.loadUser(user)
        props.onRouteChange('home')
      }else {
        seterror_msg (user)
        console.log(user);
        setSerror(true);
      }
    } )
  }

  const error = (
    <div>
  <span class="f6 link  br3 pa2 ph3 pv2 mb2 dib white bg-mid-gray" href="#0">{error_msg}</span>
  </div>
);


  const onEmailChange = (event) =>{
    setemail(event.target.value)
    // console.log(event.target.value);
  }
  const onPasswordChange = (event) =>{
    setpassword(event.target.value)
    // console.log(event.target.value);
  }
  const onSubmit = (event) =>{
    console.log('i am in');
    fetch('https://obscure-refuge-34122.herokuapp.com/signin',{
    method :'post',
    headers :{'content-type': 'application/json'},
    body:JSON.stringify({
      email: Semail,
      password:Spassword
      })
    })
    .then(resp => resp.json())
    .then(user =>{
      if (user.id){
        setSerror(false);
        props.loadUser(user)
        props.onRouteChange('home')
      }else {
        seterror_msg (user)
        console.log(user);
        setSerror(true);
      }
    } ).catch(err =>{
      console.log(err);
    })

      console.log(Semail);
      console.log(Spassword);
  }



  return (
    <div className="ba br2 center w-100 w-30-l w-60-m shadow-5">
    <main className="  pa4 black-80">
<form className="measure center"  >
  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

    {(props.route === 'signIn')?
    <Fragment>
    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
    </Fragment>
    :
    <Fragment>
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">name</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"
        id="name"
        onBlur={onNameChange}/>
        </div>
    </Fragment>

    }
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"
      id="email-address"
      onBlur={onEmailChange}
      required />
    </div>
    <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
      <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"
      id="password"
      onBlur={onPasswordChange}
      required />
    </div>
{(Serror === true)?
   error
   :
   <div></div>
 }


  </fieldset>


  {(props.route === 'signIn')?
  <Fragment>
  <div className="">
    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in"
onClick={()=>onSubmit()}
    />
  </div>
  <div className="lh-copy mt3">
    <p onClick={()=> props.onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
  </div>
  </Fragment>
  :
  <div className="">
    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register & Sign in"
    onClick={()=>onRegister()}
    />
  </div>
}
</form>
</main>

    </div>
  )
}

export default SignIn;
