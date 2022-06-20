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
    width: 50%;
    height: auto;
    box-shadow: 0px 5px 30px 0px ${colors.tertiary};
    background-color: ${colors.secondary};
    align-items: center;
`

const Label = styled.label`
    font-size: 20px;
    color: ${colors.tertiary};
    margin: 10px;
`

const InputImage = styled.input` 
    font-size: 15px;
`

const Image = styled.image`
    display: flex;
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
    let [description, setDescription] = useState(null);
    let [image, setImage] = useState(null);
    const navigate = useNavigate();
    function SendPost(e){
        e.preventDefault();

        fetch("http://localhost:3001/post", {
            method: "POST",
              headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({image, description}),
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
        <Card method="post">
            <Label>Image</Label>
            <InputImage type='file' accept="image/png, image/jpeg, image/jpg" onChange={(e) => setImage(e.target)} required/>
            <Label>Description</Label>
            <Description onChange={(e) => setDescription(e.target.value)} required/>
            <StyledButton type='submit' value='Poster' onClick={SendPost}/>
        </Card>
    )
}

export default NewPost