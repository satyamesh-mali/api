import React, { useEffect, useState } from 'react'
import profileimg from '../images/profile.jpg'

const Profile = ({token,setLoadingValue,logedin,showAlert}) => {
  const [userData,setUserData] = useState([]);
  const fetchUser =async ()=>{
    setLoadingValue(30);
    const url = "http://localhost:5000/users/getuser";
    const fetchData = await fetch(url,{
      method:"GET",
      headers:{
        "content-type":"application/json",
        "auth-token":token
      }
    })
    setLoadingValue(80);
    const jsonData = await fetchData.json();
    console.log(jsonData)
    setUserData(jsonData.user);
    setLoadingValue(100);
  }

  useEffect(() => {
    fetchUser();
    setLoadingValue(100);
  }, [])
  return (
    <>
    <div style={{textAlign:'center'}}>
      <img style={{width:'400px'}} src={profileimg} class="img-fluid" alt="..."></img>
    </div>
    <div style={{textAlign:'center',marginTop:"30px"}}>
      <h3>Name : {userData.name}</h3>
      <h4>Email : {userData.email}</h4>
      <h6>Follower : </h6>
    </div>
    </>
  )
}

export default Profile
