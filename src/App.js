import React , {useState} from 'react';
import './App.css';
import Navigation from './Compnents/Navigation/Navigation'
import Logo from './Compnents/Logo/Logo'
import ImageLinkForm from './Compnents/ImageLinkForm/ImageLinkForm'
import Rank from './Compnents/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './Compnents/FaceRecognition/FaceRecognition'
import SignIn from './Compnents/SignIn/SingIn'
import Register from './Compnents/Register/Register'
import 'tachyons'
// import Clarifai from 'clarifai'
// import config from './particlesjs-config.json'

const particlesOptions = {
  particles: {
     number : {
       value: 120,
       density:{
         enable :true,
         value_area:800
       }
     },shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    }

 }
}

// const app = new Clarifai.App({
//  apiKey: 'ac2d398fd77a4f3cb512614926e846af'
// });


function App() {
  const [input, setInput] = useState('https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528');
  const [imageUrl, setimageUrl] = useState('https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528');
  const [box, setbox] = useState({});
  const [route, setroute] = useState('signIn');
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setuser] = useState({
    id: '',
    name:'',
    email:'',
    entries:'' ,
    joined:''
  })
  const resetState = () =>{
    setInput('https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528')
    setimageUrl('https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528');
    setbox({});
    setroute('signIn');
    setisSignedIn(false);
    setuser({
      id: '',
      name:'',
      email:'',
      entries:'' ,
      joined:''
    });

  }

  const loadUser = (user) =>{
    setuser({
      id: user.id,
      name:user.name,
      email:user.email,
      entries:user.entries ,
      joined:user.joined
    })
  }

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   fetch('http://localhost:3000')
  //   .then ( response => response.json())
  //   .then(data => console.log(data))
  // }, []);



  const faceLocation = (faceBox) =>{
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol : faceBox.left_col *width,
      topRow : faceBox.top_row * height,
      rightCol : width - (faceBox.right_col*width),
      bottomRow: height - (faceBox.bottom_row * height)
    }

  }
  const displayFaceBox = (params) =>{
    console.log(params);
    setbox(params)
  }

  const onInputCHange = (event) =>{
    setInput(event.target.value)
    console.log(event.target.value);
  }
  const onSubmit = (event) =>{
    setimageUrl(input)

    fetch('https://obscure-refuge-34122.herokuapp.com/imageUrl',
  {
    method: 'post',
    headers :{ 'content-type':'application/json'},
    body : JSON.stringify({
      input: input
    })
  })
    .then(response => response.json())
    .then(
    function(response) {
      fetch('https://obscure-refuge-34122.herokuapp.com/image',
    {
      method: 'put',
      headers :{ 'content-type':'application/json'},
      body : JSON.stringify({
        id : user.id
      })
    })
    .then( resp => resp.json())
    .then(entries => {
      setuser({...user, entries: entries})
      console.log(user);
    }).catch(console.log)
      // do something with response
      // response.outputs[0].data.regions[0].region_info.bounding_box
      displayFaceBox(faceLocation(response.outputs[0].data.regions[0].region_info.bounding_box))
      console.log( response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
      console.log(err);
    }
  );
    console.log('clicked');
  }
  const onRouteChange = (route) =>{
    setroute(route)
    if ( route === 'signIn'){
      setisSignedIn (false);
      resetState();
    }else if ( route === 'home'){
      setisSignedIn (true);
    }
  }

// ac2d398fd77a4f3cb512614926e846af
  return (
    <div className="App" >
      <Particles className = "particles"
                  params={particlesOptions} />

        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>

          {(route === 'signIn' ||route === 'register' )?
             <SignIn onRouteChange={onRouteChange} loadUser={loadUser} route={route}/>
          :
              <div>
              <Logo / >
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={onInputCHange} onSubmit ={onSubmit} />
              <FaceRecognition imageUrl = {imageUrl} box= {box} />
              </div>

    }
  </div>
  );
}

export default App;
