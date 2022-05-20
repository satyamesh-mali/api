import React,{useState} from 'react'
import { useEffect } from 'react';
import Notlogin from './Notlogin'


// comments is a different page where a user can read a complete comment 
const Commentsinfo = ({logedin,showAlert,userId,userName,description,title,token}) => {
  const [desc,setDesc] = useState("");
  // This is the list of the nested comments and make sure always check while using a array function whether it's an array or not
  const addthecomment=async ()=>{
    try{
      const url = `http://localhost:5000/api/comments/add-a-nested-commment/${userId}`;
    const fetchData = await fetch(url,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "auth-token":token
      },
      body:JSON.stringify({description:desc})
    });
    const jsonData = await fetchData.json();
    if(jsonData.success){
      console.log(jsonData);
      showAlert(jsonData.msg);
      setDesc("");
    }
    else{
      showAlert(jsonData.msg);
    }
    }catch(err){
      showAlert("Hey some error occured!")
    }
    fetchTheData()
  }

  const [list,setList] = useState([]);
  const fetchTheData=async ()=>{
    try{
      const url = `http://localhost:5000/api/comments/get-all-the-nested-comment/${userId}`;
    const fetchData = await fetch(url,{
      method:"GET",
      headers:{
        "content-type":"application/json",
        "auth-token":token
      }
    });
    const jsonData = await fetchData.json();
    setList(jsonData.comments)
    
    }catch(err){
      showAlert("Hey some error occured!")
      console.log(err)
    }
  }

  useEffect(() => {
    try{
      fetchTheData();
    }catch(err){
      showAlert("Hey some error occured!")
    }
  }, [])

  
  
  
  return (
   <>
   <div style={{width:'70vw',height:"250px",margin:'auto',borderRadius:"20px"}}>
     <h4 style={{marginLeft:'20px',textAlign:'center'}}>{title.toUpperCase().slice(0,30)}</h4>
     <hr style={{backgroundColor:'white',height:'10px'}} />
     <div style={{marginLeft:'10px',textAlign:'center'}}>
     <p style={{minHeight:'80px',maxHeight:'120px'}}>{description.slice(0,500)}</p>
     </div>
     <h6 style={{textAlign:'right',marginRight:"20px"}}>{userName.toUpperCase().slice(0,25)}</h6>
   </div>
   <hr style={{backgroundColor:'white',height:'10px',widht:'60vw',margin:"auto"}} />
   <div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
     <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}}  style={{width:'70vw',heigth:'30px',textAlign:'center',borderRadius:"20px",border:'3px solid black'}} type="text"  placeholder='Add a comment'/>
   </div>
   {/* <button onClick={()=>{addthecomment()}}>Add the Comment</button> */}
   <div style={{textAlign:'center',height:'100px'}}>
   <button
          onClick={()=>{addthecomment()}}
          style={{ textAlign: "center",marginTop:'20px'}}
          type="button"
          class="btn btn-light"
        >
          Add the comment
        </button>
   </div>
  {list.map((data)=>{
      return <>
      <p style={{textAlign:'center'}}>{data.description}</p>
      <hr style={{backgroundColor:'white',height:'10px'}} />
      </>
    })}
   </>
  )
}

export default Commentsinfo
