import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Post from "../../components/Post";


function Dashboard({description}) {
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
      <Banner />
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