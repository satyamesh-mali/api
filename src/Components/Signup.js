import React, { useState ,useEffect } from 'react'

const Signup = ({setLoadingValue,setRealName,logedin,setLogedin,showAlert,setToken}) => {
  useEffect(() => {
    setLoadingValue(100);
  }, [])

  // setting the state for recieving the value form the input
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  // taking data from the backend and sending the headers;
  const submit =async (e)=>{
    try{
    showAlert("processing")
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/signup'
    setLoadingValue(20);
    const fetchData = await fetch(url,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      // stringigying data to send in the backend without this it will cause an error
      body:JSON.stringify({name,email,password})
    })
    setLoadingValue(60);
    const data = await fetchData.json();

    if(data.success){
      setLoadingValue(100);
      showAlert("Your account has been created and you are successfully loged in")
      setToken(data.token);
      setRealName(data.user.name);
      setLogedin(true)
    }
    else{
      setLoadingValue(100);
      showAlert(data.err)
      setToken("");
    }
    setName("");
    setEmail("");
    setPassword("");
    }catch(err){
      setLoadingValue(100);
      console.log(err);
      setToken("");
    }
  }

  const logout = ()=>{
    try{
      setLogedin(false);
    setToken("");
    }catch(err){
      showAlert('Hey some error occured!')
    }
  }
 
  return (

      <div className='container dy-flex my-3 justify-content-center'>
        {/* here when user will loged in then only he will be shown the login plate else it will show the user is already login .. */}
        {!logedin?<div className='container'>
        <form onSubmit={submit}>
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">name</label>
      <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} id="name" name='name' placeholder="name@example.com"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">email</label>
      <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" name='email' />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">password</label>
      <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} name='password' id="password" />
    </div>
    {/* <button type='submit'>submit</button> */}
    <button type="submit" class="btn btn-light">Login</button>
    </form>
    </div>: <>
      <h1>Hey you have signed In..</h1>
      <h4 style={{cursor:'pointer',textAlign:'center'}} onClick={()=>{logout()}}>click to logout</h4>
      </>}
      </div>

  )
}

export default Signup;

