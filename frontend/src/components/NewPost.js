import styled from "styled-components";
import colors from "../utils/styles/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = styled.form`
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    padding: 30px;
    border-radius: 30px;
    width: 40%;
    height: auto;
    box-shadow: 0px 5px 30px 0px ${colors.tertiary};
    background-color: ${colors.secondary};
    align-items: center;
    @media(max-width: 1024px){
        width: 80%;
    }
`

const Label = styled.label`
    font-size: 20px;
    color: ${colors.tertiary};
    margin: 10px;
`

const InputImage = styled.input` 
    font-size: 15px;
`

const Description = styled.textarea`
    font-size: 15px;
    width: 95%;
    height: 100px;
    border-radius: 10px;
    border: 0px;
    white-space: normal;
    color: ${colors.tertiary};
`

const StyledButton = styled.input`
    text-align: center;
    width: 200px;
    height: 40px;
    font-size: 20px;
    margin: 20px auto;
    color: ${colors.primary};
    background-color: ${colors.tertiary};
    border-radius: 30px;
    border: 0px solid white;
    box-shadow: 2px 5px 14px -3px ${colors.tertiary};
    transition: 300ms;
    &:hover{
        cursor: pointer;
        box-shadow: 2px 5px 14px 0px ${colors.tertiary};
        color: ${colors.secondary};
    }
`

function NewPost(){
    let [description, setDescription] = useState('');
    let [files, setFiles] = useState(null);
    const navigate = useNavigate();
    function SendPost(e){
        e.preventDefault();
        let formData = new FormData();
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        if(files){
            formData.append('image', files[0]);
            formData.append('description', description);
            formData.append('userId', userId);
        }
        else{
            formData.append('description', description);
            formData.append('userId', userId);
        }
        fetch("http://localhost:3001/post", {
            method: "POST",
              headers: { 
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: formData,
            })
            .then(function(res){
                if(res.ok){
                    console.log("Ok");
                    return res.json();
                }
            })
            .then(function(res){
                navigate('/dashboard');
            })
            .catch(function(err){
                // afficher une erreur dans la console 
                console.log(err)
        })
    }

    return(
        <Card id='card'>
            <Label for='image'>Image</Label>
            <InputImage name='image' type='file' accept="image/png, image/jpeg, image/jpg" onChange={(e) => setFiles(e.target.files)}/>
            <Label for='description'>Description</Label>
            <Description name='description' onChange={(e) => setDescription(e.target.value)}/>
            <StyledButton type='submit' value='Poster' onClick={SendPost}/>
        </Card>
    )
}

export default NewPost