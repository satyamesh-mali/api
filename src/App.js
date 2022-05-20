import logo from './logo.svg';
import './App.css';
import "./css/universal.css"
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Introscreen from './Components/Introscreen';
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import { useState , useEffect } from 'react';
import Alert from './Components/Alert';
import Comments from './Components/Comments';
import Nosuchpage from './Components/Nosuchpage';
import Commentsinfo from './Components/Commentsinfo';
import Addcomment from './Components/Addcomment';
import Profile from './Components/Profile';


function App() {
  // token to valid the user this token will come form the backend
  const [token,setToken] = useState("");
  const [message,setMessage] = useState(null);
  const[realName,setRealName] = useState('');
  // to check whether the user in loged in or not
  const [logedin,setLogedin] = useState(false);
  const [title,setTitle] = useState("");
  const [userName,setUserName] = useState("");
  const [description,setDescription] = useState("");
  const [userId,setUserId] = useState("");

  const [loadingValue, setLoadingValue] = useState(0)


  // to show alert
  const showAlert = (msg)=>{
    setMessage(msg);
    setTimeout(()=>{
      setMessage(null)
    },5000);
  }

  const showthedata = (data)=>{
    try{
      setTitle(data.title);
    setUserName(data.userName);
    setDescription(data.description);
    setUserId(data._id);
    }catch(err){
      showAlert('Hey some error occured!')
    }
  }

  useEffect(() => {
    setLoadingValue(100);
  }, [])
  
  return (
    // router
    <Router>
    <Navbar logedin={logedin}/>
    <Alert message={message}/>
    <LoadingBar color='#f11946'
        progress={loadingValue}
        onLoaderFinished={() => setLoadingValue(0)}

        />
    <Routes>
      <Route exact path='/' element={<Introscreen/>} />
      <Route exact path='/login' element={<Login setLoadingValue={setLoadingValue} realName={realName} setRealName={setRealName} logedin={logedin} setLogedin={setLogedin} setToken={setToken} showAlert={showAlert}/>}/>
      <Route exact path='/signup' element={<Signup setLoadingValue={setLoadingValue} setRealName={setRealName}  logedin={logedin} setLogedin={setLogedin} setToken={setToken} showAlert={showAlert}/>}/>
      <Route exact path='/comments-on-problem' element={<Comments setLoadingValue={setLoadingValue} showthedata={showthedata} logedin={logedin} setToken={setToken} showAlert={showAlert} token={token}/>}/>
      <Route exact path='/comments-on-problem/nested-commment' element={<Commentsinfo setLoadingValue={setLoadingValue}  token={token} logedin={logedin} showAlert={showAlert} userId={userId}  userName={userName} description={description} title={title}/>}/>
      <Route exact path='/Add-a-comment'  element={<Addcomment setLoadingValue={setLoadingValue} realName={realName}  token={token} logedin={logedin} showAlert={showAlert} userName={userName}/>}/>
      <Route exact path='/profile'  element={<Profile token={token} setLoadingValue={setLoadingValue} logedin={logedin} showAlert={showAlert}/>}/>
      <Route exact path='*' element={<Nosuchpage/>}/>

    </Routes>
    </Router>
  );
}

export default App; 
