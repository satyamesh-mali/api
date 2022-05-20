import React, { useState, useEffect } from "react";
import Nestedcomment from "./Nestedcomment";
import Notlogin from "./Notlogin";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = ({ setLoadingValue,logedin, setToken, showAlert, token, showthedata }) => {
  // this is the commenst list.
  const [commentsList, setCommentsList] = useState([]);
  const [dupCommentsList,setDupCommentsList] = useState([]);
  const [sliceCount,setSliceCount] = useState(3);

  const fetchData = async () => {
    try {
      const url = "http://localhost:5000/api/comments/fetchallcomments";
      setLoadingValue(20);
      const fetchData = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      });
      setLoadingValue(50)
      console.log("dd bharat")
      const data = await fetchData.json();
      setLoadingValue(85)
      if (data.success) {
        showAlert("successfully rendered all the messages");
        setCommentsList(data.comments);
        setDupCommentsList(commentsList.slice(0,sliceCount))
      }
      setLoadingValue(100)

    } catch (err) {
      showAlert("Hey some error occured");
      console.log(err);
      setLoadingValue(100)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchMore = ()=>{
    setSliceCount(6);
    setDupCommentsList(commentsList.slice(0,sliceCount))
    fetchData();
  }

  return (
    <>
      {logedin ? (
        <div
          className="container m-auto text-center"
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          <div>
            <InfiniteScroll
              dataLength={dupCommentsList.length}
              next={fetchMore}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center",color:'white' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {dupCommentsList.map((data) => {
                return (
                  <Nestedcomment
                    token={token}
                    showthedata={showthedata}
                    key={data._id}
                    data={data}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      ) : (
        <Notlogin />
      )}
    </>
  );
};

export default Comments;
