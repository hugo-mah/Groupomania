import { useEffect, useState } from "react";
import BannerConnected from "../../components/BannerConnected";
import Post from "../../components/Post";


function Dashboard() {
  let token = localStorage.getItem('token');
  let [response, setResponse] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/dashboard", {
          method: "GET",
          headers: { 
            'Authorization': `Bearer ${token}`
          }
          })
          .then(function(res){
            if(res.ok){
                console.log("Ok");
                return res.json();
            }
          })
          .then(function(res){
            setResponse(res);
          })
          .catch(function(err){
              // afficher une erreur dans la console 
              console.log(err)
      })
  }, [token])
  return (
    <div>
      <BannerConnected />
      {response && (
        <section>
          {response.map((post)=>(
            <Post key={post._id} data={post}/>
          ))}
        </section>
      )}
    </div>
  );
}
  
export default Dashboard;