import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/Nestedcomments.css"


const Nestedcomment = ({data,showthedata}) => {
  const navigate = useNavigate();
  return (
       <div className='nestedContainer' style={{width:'400px',height:'150px',display:"flex",fontFamily:'Quintessential cursive',border:'2px solid orange',borderRadius:"20px",marginBottom:'30px'}}>
      <div style={{marginLeft:"20px",width:'350px'}}>
        {/* title length 20words */}
      <h4>{data.title.slice(0,20)}...</h4>
      {/* length 100 */}
      <p style={{marginLeft:'10px',height:"45px"}}>{data.description.slice(0,80)}...</p>
      <i onClick={()=>{showthedata(data)
      navigate('/comments-on-problem/nested-commment')
      }} class="fa-solid fa-book"></i>
      <h5 style={{textAlign:'right'}}>{data.userName.slice(0,20)}</h5>
      </div>
    </div>
  )
}

export default Nestedcomment;
