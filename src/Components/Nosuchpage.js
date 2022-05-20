import React from 'react'
import errorimage from "../images/errimg.jpg"

const Nosuchpage = () => {
  return (
      <div style={{width:'90vwvw',justifyContent:'center',height:'600px',textAlign:'center',backgroundColor:'#312d2d',alignItems:"center"}}>
      <img style={{marginTop:'100px',width:'400px',height:'250px',borderRadius:'20px'}} src={errorimage} alt="error" />
      <h1 style={{color:'white'}}>No such page there</h1>
    </div>
  )
}

export default Nosuchpage
