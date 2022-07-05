import { useState, useEffect } from "react"
import Banner from "../../components/Banner"
import ModifyPost from "../../components/ModifyPost"

function Modify(){
    let token = localStorage.getItem('token');
    let [response, setResponse] = useState(null);
    let str = window.location.href;
    let url = new URL(str);
    let id = url.searchParams.get("id");
    useEffect(() => {
    fetch(`http://localhost:3001/modify/${id}`, {
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
    }, [])

    return(
            response &&
            <div>
                <Banner />
                <ModifyPost data={response}/>
            </div>
    )
}

export default Modify