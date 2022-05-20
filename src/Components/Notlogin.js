import React from 'react'
import errorimage from "../images/errimg.jpg"

const Notlogin = () => {
  return (
    <div style={{width:'100vw',justifyContent:'center',height:'600px',textAlign:'center',backgroundColor:'#312d2d',alignItems:"center"}}>
      <img style={{marginTop:'100px',width:'400px',height:'250px',borderRadius:'20px'}} src={errorimage} alt="error" />
      <h1 style={{color:'white'}}>Hey you have not loged in yet</h1>
    </div>
  )
}

export default Notlogin
