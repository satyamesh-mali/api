import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import profileImage from "../images/profile.jpg"

const Navbar = ({logedin}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-dark p-4">
    <div className='text-light' style={{display:'flex',justifyContent:"center",textAlign:'center'}}>
      <div style={{display:'flex',flexDirection:'column'}}>
      <Link onClick={()=>{navigate('/')}} style={{color:'white'}} to="/" class="link-primary">Home</Link>
      <Link onClick={()=>{navigate('/login')}} style={{color:'white'}} to="/login" class="link-primary">Login</Link>
      <Link onClick={()=>{navigate('/signup')}} style={{color:'white'}} to="/signup" class="link-primary">Signup</Link>
      {logedin && <Link onClick={()=>{navigate("/comments-on-problem")}} style={{color:'white'}} to="/comments-on-problem">Comments On The Problems</Link>}
      {logedin && <Link onClick={()=>{navigate("/Add-a-comment")}} style={{color:'white'}} to="/Add-a-comment">Add A Comment</Link>}
      {logedin && <Link onClick={()=>{navigate("/profile")}} style={{color:'white'}} to="/profile">Profile</Link>}
      </div>
    </div>
  </div>
</div>
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    {logedin && <img style={{width:'46px',height:"40px",borderRadius:"40px"}} onClick={()=>{navigate('/profile')}} src={profileImage} alt="error" />}
    {/* <div style={{marginRight:'30px'}}><li style={{color:'white',listStyle:"none"}}>Login</li>
    <li style={{color:'white',listStyle:"none"}}>Signup</li></div> */}
  </div>
</nav>
    </div>
  )
}

export default Navbar
