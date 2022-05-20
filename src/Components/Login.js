import React, { useState , useEffect} from "react";

const Login = ({setLoadingValue,realName,setRealName,logedin,setLogedin ,setToken, showAlert }) => {

  useEffect(() => {
    setLoadingValue(100);
  }, [])
  // taking data from the backend and sending the headers;
  const logUser = async (e) => {
    try{
      e.preventDefault();
    showAlert("Processing");
    setLoadingValue(30);
    const url = "http://localhost:5000/api/auth/login";
    setLoadingValue(50);
    const fetchData = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // stringigying data to send in the backend without this it will cause an error
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setLoadingValue(800);
    const jsonData = await fetchData.json();
    if (!jsonData.success) {
      setLoadingValue(100);
      showAlert(jsonData.msg);
      setToken("")
    } else {
      console.log(jsonData)
      setRealName(jsonData.user.name);
      console.log(realName)
      showAlert(jsonData.msg);
      setToken(jsonData.token);
      setLogedin(true)
      setLoadingValue(100);
    }
    setEmail("");
    setPassword("");
    }catch(err){
      showAlert("Hey some error occured!");
      setLoadingValue(100);
    }
  };
  const logout = ()=>{
    try{
      setLogedin(false);
    setToken("");
    }catch(err){
      showAlert('Hey some error occured!')
    }
  }
  // setting the state for recieving the value form the input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container dy-flex justify-content-center">
      {/* here when user will loged in then only he will be shown the login plate else it will show the user is already login .. */}
      {!logedin?<form onSubmit={logUser}>
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/* <button type="submit" class="btn btn-primary">
          Submit
        </button> */}
        <button type="submit" class="btn btn-light">Submit</button>
      </form>: <>
      <h1>Hey you have signed In..</h1>
      <h4 style={{cursor:'pointer'}} onClick={()=>{logout()}}>click to logout</h4>
      </>
      }

    </div>
  );
};

export default Login;
