import React, { useEffect, useState } from "react";

const Addcomment = ({ setLoadingValue,realName, logedin, showAlert, userName, token }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  // const
  const addComment = async () => {
    try{
      let url = "http://localhost:5000/api/comments/add-a-comment";
    // console.log(userName)
    setLoadingValue(30)
    const fetchData = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3NjFjNTRkZmEyMzkzNTRmY2I3NmZlIn0sImlhdCI6MTY1MjA2ODc0OH0.ukeSCfspaktUcmWVf_h3YPHhg0mMbBqfdDAyv92eXYY",
      },
      body: JSON.stringify({
        title: title.toUpperCase(),
        description: description,
        userName: realName,
      }),
    });
    setLoadingValue(80);
    const jsonData = await fetchData.json();
    console.log(jsonData);
    showAlert(jsonData.msg);
    setDescription("");
    setTitle("");
    setLoadingValue(100);
    }catch(err){
      setLoadingValue(100);
      showAlert("Hey some error occured!")
    }
  };
  useEffect(() => {
    setLoadingValue(100);
  }, [])
  return (
    <div style={{ textAlign: "center" }}>
      {/* <input type="text" value={realName} editable='false' /> */}
      <div class="input-group input-group-lg">
        <span class="input-group-text" id="inputGroup-sizing-lg">
          Title
        </span>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
        />
      </div>
      {/* <input placeholder="Add a title" onChange={(e)=>{setTitle(e.target.value)}} value={title}  style={{width:"400px",textAlign:'center'}} type="text" /> */}
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        class="container my-3"
      >
        {/* <textarea name="description" id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} cols="40" rows="10"></textarea> */}
        <textarea
          name="description"
          cols="30"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          class="form-control"
          placeholder="Add a comment"
          id="description"
        ></textarea>
        <div class="form-floating"></div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            addComment();
          }}
          style={{ textAlign: "center" }}
          type="button"
          class="btn btn-light"
        >
          Add the comment
        </button>
      </div>
    </div>
  );
};

export default Addcomment;
